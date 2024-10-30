const createBusConfirmationPDF = (doc, order) => {
    // Header Section
    doc.fontSize(20).text('Bus Booking Confirmation', { align: 'center' })
       .moveDown();

    // Booking Reference Section
    doc.fontSize(16).text('Booking Reference Details', { underline: true })
       .fontSize(12)
       .text(`Booking ID: ${order.serviceResponse.booking_id}`)
       .text(`Booking Date/Time: ${new Date(order.createdAt).toLocaleString()}`)
       .text(`Total Amount Paid: ₹${order.amount}`)
       .moveDown();

    // Bus Trip Details
    doc.fontSize(16).text('Trip Details', { underline: true })
       .fontSize(12)
       .text(`Source: ${order.serviceDetails.sourceName} (${order.serviceDetails.source})`)
       .text(`Destination: ${order.serviceDetails.destinationName} (${order.serviceDetails.destination})`)
       .text(`Date of Journey: ${order.serviceDetails.doj}`)
       .text(`Trip ID: ${order.serviceDetails.tripid}`)
       .moveDown();

    // Seat Details
    doc.fontSize(16).text('Seat Details', { underline: true });
    order.serviceDetails.seats.forEach((seat, index) => {
        doc.fontSize(12)
           .text(`${index + 1}: ${seat.passengername} Age: ${seat.passengerage} Seat ${seat.seatname}`)
           .moveDown(0.5);
    });

    // Passenger Information
    doc.fontSize(16).text('Passenger Information', { underline: true })
       .fontSize(12)
       .text(`Mobile: ${order.serviceDetails.mobile}`)
       .text(`Email: ${order.serviceDetails.email}`)
       .text(`ID Type: ${order.serviceDetails.idtype}`)
       .text(`ID Number: ${order.serviceDetails.idnumber}`)
       .text(`Address: ${order.serviceDetails.address}`)
       .moveDown();

    // Important Notices
    doc.fontSize(16).text('Important Notices', { underline: true })
       .fontSize(12)
       .text('• Please arrive at the boarding point at least 30 minutes before departure.')
       .text('• Carry a valid government-issued photo ID for verification.')
       .text('• For any assistance, contact our 24x7 helpline.');

    return doc;
};

module.exports = { createBusConfirmationPDF };
