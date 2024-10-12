const Order = require('../models/Order');
const User = require('../models/User');

exports.getPaginatedOrders = async (req, res) => {
    const { page = 1, limit = 15 } = req.query;

    try {
        const skip = (page - 1) * limit;
        const totalOrders = await Order.countDocuments();
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('clientId', 'name')
            .exec();

        const formattedOrders = await Promise.all(orders.map(async order => {
            const user = await User.findOne({ clientId: order.clientId }).lean().exec();
            return {
                clientName: user ? user.name : 'Unknown',
                serviceType: order.serviceType,
                orderId: order.orderId,
                amount: order.amount,
                serviceDetails: order.serviceDetails,
                status: order.status,
            };
        }));

        res.status(200).json({
            success: true,
            data: formattedOrders,
            totalOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.searchOrders = async (req, res) => {
    const { query } = req.params;
    const { page = 1, limit = 15 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const users = await User.find({
            name: { $regex: query, $options: 'i' }
        }).select('clientId');

        const clientIds = users.map(user => user.clientId);

        const totalOrders = await Order.countDocuments({
            $or: [
                { orderId: { $regex: query, $options: 'i' } },
                { clientId: { $in: clientIds } }
            ]
        });

        const orders = await Order.find({
            $or: [
                { orderId: { $regex: query, $options: 'i' } },
                { clientId: { $in: clientIds } }
            ]
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('clientId', 'name')
            .exec();

        const formattedOrders = await Promise.all(orders.map(async order => {
            const user = await User.findOne({ clientId: order.clientId }).lean().exec();
            return {
                clientName: user ? user.name : 'Unknown',
                serviceType: order.serviceType,
                orderId: order.orderId,
                amount: order.amount,
                serviceDetails: order.serviceDetails,
                status: order.status,
            };
        }));

        res.status(200).json({
            success: true,
            data: formattedOrders,
            totalOrders
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
