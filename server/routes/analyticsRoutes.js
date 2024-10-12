const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analyticsController');

// Define routes for analytics
router.get('/total-orders-count', analyticsController.getTotalOrdersCount);
router.get('/orders-per-service-type', analyticsController.getOrdersPerServiceType);
router.get('/total-orders', analyticsController.getTotalOrders);
router.get('/revenue-analytics', analyticsController.getRevenueAnalytics);
router.get('/orders-by-service-type', analyticsController.getOrdersByServiceType);
router.get('/revenue-by-service-type', analyticsController.getRevenueByServiceType);
router.get('/orders-over-time', analyticsController.getOrdersOverTime);
router.get('/top-clients', analyticsController.getTopClients);
router.get('/revenue-over-time', analyticsController.getRevenueOverTime);

module.exports = router;
