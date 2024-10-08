const mongoose = require('mongoose');

const bookingLogSchema = new mongoose.Schema({
    source: String,
    sourceName: String,
    destinationName: String,
    destination: String,
    doj: Date,
    tripid: String,
    bpid: String,
    dpid: String,
    mobile: String,
    email: String,
    idtype: String,
    idnumber: String,
    address: String,
    Search_Key: String,
    seats: Object,
    booking_id: String,
    agentid: String,
    bookingData: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
});

const BookingLog = mongoose.model('BusBookingLog', bookingLogSchema);

module.exports = BookingLog;
