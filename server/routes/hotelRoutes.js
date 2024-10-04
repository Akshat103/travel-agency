const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/hotelcity', hotelController.getCity);

module.exports = router;
