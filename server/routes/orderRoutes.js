const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/get', orderController.getPaginatedOrders);
router.get('/search/:query', orderController.searchOrders);

module.exports = router;
