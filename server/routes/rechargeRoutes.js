const express = require('express');
const router = express.Router();
const rechargeController = require('../controller/rechargeController');
const {authMiddleware} = require('../middleware/authMiddleware');

// Define routes
router.get('/balance', rechargeController.getBalance);
router.get('/get-circle', rechargeController.getCircle);
router.get('/get-operator', rechargeController.getOperator);
router.post('/recharge', authMiddleware, rechargeController.rechargeRequest);
router.get('/dispute', rechargeController.disputeRequest);
router.get('/status', rechargeController.checkStatus);

module.exports = router;
