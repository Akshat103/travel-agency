const Order = require('../models/Order');
const RechargeLog = require('../models/RechargeLog');
const BookingLog = require('../models/BusBookingLog');

const getOrdersByClientId = async (req, res) => {
    try {
        const clientId = req.user.clientId;
        const orders = await Order.find({ clientId, status: 'paid' });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getBookingsByClientId = async (req, res) => {
    try {
        const clientId = req.user.clientId;
        const bookings = await BookingLog.find({ agentid: clientId }).select('sourceName destinationName doj bookingData');
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getRechargesByClientId = async (req, res) => {
    try {
        const clientId = req.user.clientId;
        const recharges = await RechargeLog.find({ clientId });
        res.status(200).json({ success: true, recharges });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getBookingsByClientId,
    getOrdersByClientId,
    getRechargesByClientId
}