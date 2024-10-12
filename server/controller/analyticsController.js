const Order = require('../models/Order');

// Get total orders count
exports.getTotalOrdersCount = async (req, res) => {
    try {
        const count = await Order.countDocuments();
        res.json({ totalOrders: count });
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

// Controller to get total orders
exports.getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({});
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total orders' });
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

        res.status(200).json({
            totalRevenue: totalRevenue[0]?.total || 0,
            avgOrderValue: avgOrderValue[0]?.avgValue || 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch revenue analytics' });
    }
};

// Controller to get orders by service type
exports.getOrdersByServiceType = async (req, res) => {
    try {
        const ordersByServiceType = await Order.aggregate([
            { $group: { _id: '$serviceType', count: { $sum: 1 } } }
        ]);

        res.status(200).json(ordersByServiceType);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders by service type' });
    }
};

// Controller to get revenue by service type
exports.getRevenueByServiceType = async (req, res) => {
    try {
        const revenueByServiceType = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: '$serviceType', totalRevenue: { $sum: '$amount' } } }
        ]);

        res.status(200).json(revenueByServiceType);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch revenue by service type' });
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

        res.status(200).json(ordersOverTime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders over time' });
    }
};

// Controller to get revenue over time (trend analysis)
exports.getRevenueOverTime = async (req, res) => {
    try {
        const revenueOverTime = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$amount" } // Assuming 'amount' is the field representing the revenue in your Order model
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json(revenueOverTime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch revenue over time' });
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

        res.status(200).json(topClients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top clients' });
    }
};


