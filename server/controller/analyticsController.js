const Order = require('../models/Order');
const User = require('../models/User');

// Get total orders count
exports.getTotalOrdersCount = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.json({ totalOrders: count });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get total amount by status
exports.getTotalAmountByStatus = async (req, res) => {
    try {
        const statuses = ['created', 'paid', 'failed'];
        const result = await Promise.all(
            statuses.map(async (status) => {
                const totalAmount = await Order.aggregate([
                    { $match: { status: status } },
                    { $group: { _id: null, total: { $sum: '$amount' } } }
                ]);
                return { status, totalAmount: totalAmount[0] ? totalAmount[0].total : 0 };
            })
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get orders per service type
exports.getOrdersPerServiceType = async (req, res) => {
    try {
        const result = await Order.aggregate([
            { $group: { _id: '$serviceType', count: { $sum: 1 } } }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getLatestOrders = async (req, res) => {
    try {
        const latestOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean()
            .exec();

        const formattedOrders = await Promise.all(latestOrders.map(async order => {
            const user = await User.findOne({ clientId: order.clientId }).lean().exec();
            return {
                clientName: user ? user.name : 'Unknown',
                serviceType: order.serviceType,
                orderId: order.orderId,
                amount: order.amount,
                status: order.status,
            };
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching latest orders:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

