const express = require('express');
const userDashboardController = require('../controller/userDashboardController');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/orders', authMiddleware, userDashboardController.getOrdersByClientId);
router.get('/bookings', authMiddleware, userDashboardController.getBookingsByClientId);
router.get('/recharges', authMiddleware, userDashboardController.getRechargesByClientId);

module.exports = router;
