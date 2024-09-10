const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dbConnect = require('./config/dbConnect');
require('dotenv').config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

dbConnect();

// api routes
const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const rechargeRoutes = require('./routes/rechargeRoutes');

app.use('/api', userRoutes);
app.use('/api', flightRoutes);
app.use('/api', rechargeRoutes);

// Serve static files from frontend, dashboard, and super-admin folders
app.use('/', express.static(path.join(__dirname, '../frontend')));
app.use('/dashboard', express.static(path.join(__dirname, '../dashboard')));
app.use('/super-admin', express.static(path.join(__dirname, '../super-admin')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../dashboard', 'db-dashboard.html'));
});

app.get('/super-admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../super-admin', 'db-dashboard.html'));
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});