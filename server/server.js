const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dbConnect = require('./config/dbConnect');
const cookieSession = require('cookie-session');
const compression = require('compression');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const cors = require('cors');

const app = express();

// CORS configuration at app level
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors());
app.use(compression()); 

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

dbConnect();

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const rechargeRoutes = require('./routes/rechargeRoutes');
const otpRoutes = require('./routes/otpRoutes');
const busRoutes = require('./routes/busRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mailRoutes = require('./routes/mailRoutes');
const userDashboardRoutes = require('./routes/userDashboardRoutes');
const irctcRoutes = require('./routes/irctcRoutes');
const serviceRoutes = require('./routes/serviceChargeRoutes');

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', flightRoutes);
app.use('/api', rechargeRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', busRoutes);
app.use('/api', hotelRoutes);
app.use('/api', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/irctc', irctcRoutes);
app.use('/api/dashboard', userDashboardRoutes);
app.use('/api/services', serviceRoutes);

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
