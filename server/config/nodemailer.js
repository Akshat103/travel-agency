const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
require('dotenv').config();

let transporter;

try {
    // Ensure email credentials are present
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        logger.error('Email user or password is missing in environment variables');
        throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment variables');
    }

    // Create transporter
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Verify transporter
    transporter.verify((error, success) => {
        if (error) {
            logger.error('Error verifying email transporter:', error);
            process.exit(1);
        } else {
            logger.info('Email transporter is ready to send emails.');
        }
    });

} catch (error) {
    logger.error('Error creating email transporter:', error.message);

    if (process.env.NODE_ENV !== 'production') {
        logger.error(error.stack);
    }

    process.exit(1);
}

module.exports = transporter;
