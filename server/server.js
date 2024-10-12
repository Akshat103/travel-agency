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

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const rechargeRoutes = require('./routes/rechargeRoutes');
const otpRoutes = require('./routes/otpRoutes');
const busRoutes = require('./routes/busRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userDashboardRoutes = require('./routes/userDashboardRoutes');

// Use the routes
app.use('/api', userRoutes);
app.use('/api', flightRoutes);
app.use('/api', rechargeRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', busRoutes);
app.use('/api', hotelRoutes);
app.use('/api', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', userDashboardRoutes);

// Serve index.html at the root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Send a welcome message at /api
app.get('/api', (req, res) => {
  res.send('Welcome to Yara Holidays.');
});

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
