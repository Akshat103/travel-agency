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
const otpRoutes = require('./routes/otpRoutes');
const busRoutes = require('./routes/busRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Use the routes
app.use('/api', userRoutes);
app.use('/api', flightRoutes);
app.use('/api', rechargeRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', busRoutes);
app.use('/api',paymentRoutes);

app.use('/', (req, res) => {
  res.status(404).send('Welcome to Yara Holidays.');
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});