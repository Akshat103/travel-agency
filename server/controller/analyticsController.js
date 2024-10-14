const Order = require('../models/Order');
const logger = require('../utils/logger');

// Get total orders count
exports.getTotalOrdersCount = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        logger.info('Fetched total order count');
        res.status(200).json({ success: true, totalOrders: count });
    } catch (error) {
        logger.error(`Error fetching total order count: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get orders per service type
exports.getOrdersPerServiceType = async (req, res) => {
    try {
        const result = await Order.aggregate([
            { $group: { _id: '$serviceType', count: { $sum: 1 } } }
        ]);
        logger.info('Fetched orders per service type');
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        logger.error(`Error fetching orders per service type: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Controller to get total orders
exports.getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({});
        logger.info('Fetched total orders');
        res.status(200).json({ success: true, totalOrders });
    } catch (error) {
        logger.error(`Error fetching total orders: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch total orders' });
    }
};

// Controller to get revenue analytics
exports.getRevenueAnalytics = async (req, res) => {
    try {
        const totalRevenue = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const avgOrderValue = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, avgValue: { $avg: '$amount' } } }
        ]);

        logger.info('Fetched revenue analytics');
        res.status(200).json({
            success: true,
            totalRevenue: totalRevenue[0]?.total || 0,
            avgOrderValue: avgOrderValue[0]?.avgValue || 0
        });
    } catch (error) {
        logger.error(`Error fetching revenue analytics: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch revenue analytics' });
    }
};

// Controller to get orders by service type
exports.getOrdersByServiceType = async (req, res) => {
    try {
        const ordersByServiceType = await Order.aggregate([
            { $group: { _id: '$serviceType', count: { $sum: 1 } } }
        ]);

        logger.info('Fetched orders by service type');
        res.status(200).json({ success: true, data: ordersByServiceType });
    } catch (error) {
        logger.error(`Error fetching orders by service type: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch orders by service type' });
    }
};

// Controller to get revenue by service type
exports.getRevenueByServiceType = async (req, res) => {
    try {
        const revenueByServiceType = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: '$serviceType', totalRevenue: { $sum: '$amount' } } }
        ]);

        logger.info('Fetched revenue by service type');
        res.status(200).json({ success: true, data: revenueByServiceType });
    } catch (error) {
        logger.error(`Error fetching revenue by service type: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch revenue by service type' });
    }
};

// Controller to get orders over time (trend analysis)
exports.getOrdersOverTime = async (req, res) => {
    try {
        const ordersOverTime = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        logger.info('Fetched orders over time');
        res.status(200).json({ success: true, data: ordersOverTime });
    } catch (error) {
        logger.error(`Error fetching orders over time: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch orders over time' });
    }
};

// Controller to get revenue over time (trend analysis)
exports.getRevenueOverTime = async (req, res) => {
    try {
        const revenueOverTime = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$amount" } 
                }
            },
            { $sort: { _id: 1 } }
        ]);

        logger.info('Fetched revenue over time');
        res.status(200).json({ success: true, data: revenueOverTime });
    } catch (error) {
        logger.error(`Error fetching revenue over time: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch revenue over time' });
    }
};

// Controller to get top clients
exports.getTopClients = async (req, res) => {
    try {
        const topClients = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: '$clientId', totalRevenue: { $sum: '$amount' }, orderCount: { $sum: 1 } } },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 }
        ]);

        logger.info('Fetched top clients');
        res.status(200).json({ success: true, data: topClients });
    } catch (error) {
        logger.error(`Error fetching top clients: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to fetch top clients' });
    }
};
