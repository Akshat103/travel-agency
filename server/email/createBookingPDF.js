const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

function createConformationPDF(serviceType, user, order) {
    return new Promise((resolve, reject) => {
        try {
            logger.info(`Starting PDF creation for user: ${order.name} for ${serviceType}`);
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

            doc.fontSize(16).text('Booking Confirmation', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Name: ${order.bookingDetails.customerName}`);
            doc.text(`Booking ID: ${order.bookingDetails.id}`);

            // Dynamically add details based on booking type
            if (serviceType === 'bookflight') {
                const flight = order.bookingDetails?.flightDetails || {};
                const passengers = order.bookingDetails?.passengers || [];

                // Dynamic data with validation and fallback values for flight details
                const originAirport = flight?.Origin?.AIRPORTCODE || 'N/A';
                const originCountry = flight?.Origin?.COUNTRYCODE || 'N/A';
                const destinationAirport = flight?.Destination?.AIRPORTCODE || 'N/A';
                const destinationCountry = flight?.Destination?.COUNTRYCODE || 'N/A';
                const travelDate = flight?.TravelDate ? new Date(flight.TravelDate).toLocaleString() : 'N/A';
                const classOfTravel = flight?.Class_Of_Travel || 'N/A';

                // PDF generation for flight details
                doc.text(`Flight Origin: ${originAirport}, ${originCountry}`);
                doc.text(`Flight Destination: ${destinationAirport}, ${destinationCountry}`);
                doc.text(`Travel Date: ${travelDate}`);
                doc.text(`Class of Travel: ${classOfTravel}`);

                // Loop through passengers array and generate details for each passenger
                passengers.forEach((passenger, index) => {
                    const title = passenger?.Title || 'N/A';
                    const firstName = passenger?.First_Name || 'N/A';
                    const lastName = passenger?.Last_Name || 'N/A';
                    const passportNumber = passenger?.Passport_Number || 'N/A';
                    const nationality = passenger?.Nationality || 'N/A';
                    const seatPrice = passenger?.seatPrice || 0;
                    const totalPrice = passenger?.price || 0;

                    // Separate each passenger's details in the PDF for clarity
                    doc.text(`\nPassenger ${index + 1}:`);
                    doc.text(`Passenger Name: ${title} ${firstName} ${lastName}`);
                    doc.text(`Passport Number: ${passportNumber}`);
                    doc.text(`Nationality: ${nationality}`);
                    doc.text(`Seat Price: ${seatPrice}`);
                    doc.text(`Total Price: ${totalPrice}`);
                });
            } else if (serviceType === 'hotel') {
                doc.text(`Hotel Name: ${bookingDetails.hotelName}`);
                doc.text(`Check-In Date: ${bookingDetails.checkInDate}`);
                doc.text(`Check-Out Date: ${bookingDetails.checkOutDate}`);
                doc.text(`Room Number: ${bookingDetails.roomNumber}`);
            } else if (serviceType === 'bus') {
                doc.text(`Bus Number: ${bookingDetails.busNumber}`);
                doc.text(`Travel Date: ${bookingDetails.travelDate}`);
            } else if (serviceType === 'mobile_recharge') {
                doc.text(`Mobile Number: ${bookingDetails.mobileNumber}`);
                doc.text(`Recharge Amount: ${bookingDetails.rechargeAmount}`);
            } else if (serviceType === 'train') {
                doc.text(`Train Number: ${bookingDetails.trainNumber}`);
                doc.text(`Boarding Station: ${bookingDetails.boardingStation}`);
                doc.text(`Destination Station: ${bookingDetails.destinationStation}`);
                doc.text(`Seat Class: ${bookingDetails.seatClass}`);
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