const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analyticsController');

// Define routes for analytics
router.get('/total-orders-count', analyticsController.getTotalOrdersCount);
router.get('/total-amount-by-status', analyticsController.getTotalAmountByStatus);
router.get('/orders-per-service-type', analyticsController.getOrdersPerServiceType);
router.get('/latest-orders', analyticsController.getLatestOrders);

module.exports = router;
