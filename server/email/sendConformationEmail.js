const path = require('path');
const ejs = require('ejs');
const transporter = require("../config/nodemailer");
const logger = require('../utils/logger');

function sendConformationEmail(user, order, pdfPath) {
    return new Promise((resolve, reject) => {
        logger.info(`Starting email sending process for client: ${user.name}`);
        logger.info(`Using PDF path: ${pdfPath}`);

        const templatePath = path.join(__dirname, 'emailTemplate.ejs');
        logger.info(`Email template path: ${templatePath}`);

        // Prepare the data object for the template
        const data = {
            user,
            order
        };
        
        ejs.renderFile(templatePath, data, (err, emailHtml) => {
            if (err) {
                logger.error('Error rendering email template: ' + err);
                return reject(err);
            }

            logger.info('Email template rendered successfully');

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: order.serviceDetails.email,
                subject: `Your ${order.serviceType.charAt(0).toUpperCase() + order.serviceType.slice(1)} Confirmation`,
                html: emailHtml,
                attachments: [
                    {
                        filename: `${order.serviceType}_confirmation.pdf`,
                        path: pdfPath,
                    },
                ],
            };

            logger.info(`Sending email to: ${order.serviceDetails.email}`);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    logger.error('Error sending email: ' + error);
                    return reject(error);
                }
                logger.info('Email sent successfully. Response: ' + JSON.stringify(info));
                resolve(info);
            });
        });
    });
}

module.exports = sendConformationEmail;