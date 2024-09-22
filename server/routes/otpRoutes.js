// routes/otpRoutes.js
const express = require('express');
const { sendOtpSMS, sendOtpEmail, verifyOtpMobile, verifyOtpEmail } = require('../controller/otpController');
const router = express.Router();

router.post('/verify-mobile', verifyOtpMobile);
router.post('/verify-email', verifyOtpEmail);
router.post('/send-sms', sendOtpSMS);
router.post('/send-email', sendOtpEmail);

module.exports = router;