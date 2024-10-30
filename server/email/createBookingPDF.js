const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const { createFlightConfirmationPDF } = require('./createFlightConfirmationPDF');
const { createBusConfirmationPDF } = require('./createBusConfirmationPDF');

function createConformationPDF(user, order) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Starting PDF creation for user: ${user.name} for ${order.serviceType}`);
            const pdfDir = path.join(__dirname, '../conformationpdf');

            if (!fs.existsSync(pdfDir)) {
                fs.mkdirSync(pdfDir);
            }

            const doc = new PDFDocument();
            const filePath = path.join(pdfDir, `${user.clientId}_${Date.now()}.pdf`);
            const writeStream = fs.createWriteStream(filePath);

            writeStream.on('error', (error) => {
                logger.error(`Error writing to file: ${error.message}`);
                reject(new Error("Failed to write PDF to file"));
            });

            writeStream.on('finish', () => {
                logger.info(`PDF file closed: ${filePath}`);
                resolve(filePath);
            });

            doc.pipe(writeStream);

            doc.on('error', (error) => {
                logger.error(`Error during PDF generation: ${error.message}`);
                reject(new Error("Failed to generate PDF"));
            });

            doc.pipe(fs.createWriteStream(filePath));

            const logoPath = path.join(__dirname, '../assets/logo.png');
            if (fs.existsSync(logoPath)) {
                doc.image(logoPath, 50, 45, { width: 50 })
                    .fontSize(20)
                    .text('Yara Holidays', 110, 57)
                    .moveDown();
            } else {
                logger.warn("Logo file not found at " + logoPath);
                doc.fontSize(20).text('Yara Holidays', 110, 57).moveDown();
            }

            // Dynamically add details based on booking type
            if (order.serviceType === 'bookflight') {
                createFlightConfirmationPDF(doc, order);
            } else if (order.serviceType === 'hotel') {
                createBusConfirmationPDF(doc, order);
            } else if (order.serviceType === 'bookbus') {
                doc.text(`Bus Number: ${serviceDetails.busNumber}`);
                doc.text(`Travel Date: ${serviceDetails.travelDate}`);
            } else if (order.serviceType === 'mobile_recharge') {
                doc.text(`Mobile Number: ${serviceDetails.mobileNumber}`);
                doc.text(`Recharge Amount: ${serviceDetails.rechargeAmount}`);
            } else if (order.serviceType === 'train') {
                doc.text(`Train Number: ${serviceDetails.trainNumber}`);
                doc.text(`Boarding Station: ${serviceDetails.boardingStation}`);
                doc.text(`Destination Station: ${serviceDetails.destinationStation}`);
                doc.text(`Seat Class: ${serviceDetails.seatClass}`);
            }

            doc.end();

            logger.info('PDF generation process completed, waiting for file to be written.');

        } catch (error) {
            logger.error(`Error in createConformationPDF: ${error.message}`);
            reject(new Error("Failed to generate PDF"));
        }
    });
}

module.exports = createConformationPDF;