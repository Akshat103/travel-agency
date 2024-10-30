const createFlightConfirmationPDF = (doc, order) => {
   // Header Section
   doc.fontSize(20).text('Flight Booking Confirmation', { align: 'center' })
      .moveDown();

   // Booking Reference Section
   doc.fontSize(16).text('Booking Reference Details', { underline: true })
      .fontSize(12)
      .text(`Booking Reference Number: ${order.serviceResponse.Booking_RefNo}`)
      .text(`Transaction ID: ${order.serviceResponse.TransId}`)
      .text(`Booking Date/Time: ${new Date(order.createdAt).toLocaleString()}`)
      .text(`Total Amount Paid: ₹${order.amount}`)
      .text(`Order ID: ${order.orderId}`)
      .moveDown();

   // Flight Details
const segments = order.serviceDetails.segments;
doc.fontSize(16).text('Flight Details', { underline: true }).moveDown();

segments.forEach((segment) => {
    // Flight Information
    doc.fontSize(12)
       .text(`${segment.Airline_Name} ${segment.Airline_Code}${segment.Flight_Number} ${segment.Aircraft_Type}`)
       .moveDown();

    // Schedule
    doc.text('Schedule:')
       .text(`Departure: ${segment.Departure_DateTime}`)
       .text(`Arrival: ${segment.Arrival_DateTime}`)
       .text(`Duration: ${segment.Duration}`)
       .moveDown();

    // Origin & Destination
    doc.text('Origin:')
       .text(`Airport: ${segment.Origin} (${segment.Origin_City})`)
       .text(`Terminal: ${segment.Origin_Terminal}`)
       .moveDown()
       .text('Destination:')
       .text(`Airport: ${segment.Destination} (${segment.Destination_City})`)
       .text(`Terminal: ${segment.Destination_Terminal}`)
       .moveDown();
});

   // Passenger Details
   doc.fontSize(16).text('Passenger Details', { underline: true });
   order.serviceDetails.passengers.forEach((passenger, index) => {
      doc.fontSize(12)
         .text(`${index + 1}: ${passenger.Title} ${passenger.First_Name} ${passenger.Last_Name}`)
         .text(`Gender: ${passenger.Gender === '0' ? 'Male' : 'Female'}`)
         .text(`Seat Assignment: ${passenger.seat}`)
         .moveDown();
   });

   // Fare Details
   const fare = order.serviceDetails.fare.FareDetails[0];

   // Baggage Information
   doc.fontSize(16).text('Baggage Allowance', { underline: true })
      .fontSize(12)
      .text(`Cabin Baggage: ${fare.Free_Baggage.Hand_Baggage}`)
      .text(`Check-in Baggage: ${fare.Free_Baggage.Check_In_Baggage}`)
      .moveDown();

   // Cancellation Policy
   doc.fontSize(16).text('Cancellation Policy', { underline: true })
      .fontSize(12);
   fare.CancellationCharges.forEach(policy => {
      doc.text(`• ${policy.DurationFrom} to ${policy.DurationTo} ${policy.DurationTypeFrom === 0 ? 'hours' : 'days'} before departure: Charges: ${policy.Value}${policy.ValueType === 1 ? '%' : ' INR'}`)
         .moveDown(0.5);
   });

   // Important Notices
   doc.fontSize(16).text('Important Notices', { underline: true })
      .fontSize(12)
      .text('• Please arrive at the airport at least 2 hours before departure for domestic flights')
      .text('• Carry a valid government-issued photo ID for security check')
      .text('• Web check-in opens 48 hours before departure')
      .text('• For any assistance, contact our 24x7 helpline');

   return doc;
};

module.exports = { createFlightConfirmationPDF };