const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/hotelcity', hotelController.getCity);
router.post('/hotelbycity', authMiddleware, hotelController.searchByCity);
router.post('/hoteldetails', hotelController.hotelDetails);
router.post('/bookhotel', hotelController.bookHotel);


module.exports = router;
