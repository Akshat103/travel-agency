const transporter = require('../config/nodemailer');
const logger = require('../utils/logger');

exports.sendContactMail = async (req, res) => {
    const { name, email, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Define mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contact Request`,
        text: `You have a new contact request:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p>You have a new contact request:</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p><p>${message}</p>`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        logger.info(`Contact email from ${name} <${email}> sent successfully.`);
        
        // Respond with success
        return res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        logger.error('Error sending contact email:', error.message);
        
        // Respond with error
        return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
    }
};
