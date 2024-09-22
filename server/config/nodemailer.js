const nodemailer = require('nodemailer');

let transporter;

try {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.verify((error, success) => {
        if (error) {
            console.error('Error verifying email transporter:', error);
            process.exit(1);
        } else {
            console.log('Email transporter is ready to send emails.');
        }
    });

} catch (error) {
    console.error('Error creating email transporter:', error);
    process.exit(1);
}

module.exports = transporter;
