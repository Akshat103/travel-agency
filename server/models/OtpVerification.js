const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
    contact: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpires: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('OtpVerification', otpVerificationSchema);
