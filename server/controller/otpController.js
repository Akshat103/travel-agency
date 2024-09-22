const OtpVerification = require('../models/OtpVerification');
const generateOtp = require('../utils/otp');
const transporter = require('../config/nodemailer');
const axios = require('axios');

exports.sendOtpSMS = async (req, res) => {
    const { countryCode, mobileNumber } = req.body;

    try {
        const otp = generateOtp();
        const otpExpires = Date.now() + 10 * 60 * 1000;
        const contact = '+' + countryCode + mobileNumber;

        await OtpVerification.findOneAndUpdate(
            { contact: contact },
            { otp, otpExpires },
            { upsert: true, new: true }
        );

        const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", null, {
            headers: {
                "authorization": process.env.FAST2SMS_API_KEY
            },
            params: {
                "variables_values": otp,
                "route": "otp",
                "numbers": contact
            }
        });

        if (response.data.return) {
            res.json({ message: 'OTP sent via SMS' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP', error: response.data.message });
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

exports.sendOtpEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const otp = generateOtp();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        await OtpVerification.findOneAndUpdate(
            { contact: email },
            { otp, otpExpires },
            { upsert: true, new: true }
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Yara Travels',
            html: `
                <html>
                    <body>
                        <h2>Your OTP Code</h2>
                        <p>Dear User,</p>
                        <p>We received a request to verify your account. Please use the OTP below to complete the verification process:</p>
                        <h3 style="color: #007bff;">${otp}</h3>
                        <p>If you did not request this OTP, please ignore this email.</p>
                        <p>Thank you,<br>Yara Travels</p>
                        <footer style="margin-top: 20px; font-size: 0.8em; color: #6c757d;">
                            <p>Company Address</p>
                            <p>Contact us: <a href="mailto:support@yaratravels.com">support@yourcompany.com</a></p>
                        </footer>
                    </body>
                </html>
            `,
            text: `Your OTP is ${otp}`
        };
       
        await transporter.sendMail(mailOptions);

        res.json({ message: 'OTP sent via email' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error });
    }
};


exports.verifyOtpMobile = async (req, res) => {
    const { mobileNumber, otp } = req.body;

    try {
        const otpRecord = await OtpVerification.findOne({
            contact: mobileNumber,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await OtpVerification.findOneAndDelete({ contact: mobileNumber });

        res.json({ message: 'OTP verified successfully for mobile' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify OTP for mobile', error });
    }
};

exports.verifyOtpEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpRecord = await OtpVerification.findOne({
            contact: email,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await OtpVerification.findOneAndDelete({ contact: email });

        res.status(200).json({ message: 'OTP verified successfully for email' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify OTP for email', error });
    }
};
