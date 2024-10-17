const Order = require('../models/Order');

const getOrdersByClientId = async (req, res) => {
    try {
        const clientId = req.user.clientId;
        const orders = await Order.find({ clientId, status: 'paid' });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getOrdersByClientId
}