const express = require('express');
const router = express.Router();
const { getSourceList, getDestinationList, busSearch, seatLayout } = require('../controller/busController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/getSourceList', getSourceList);
router.post('/getDestinationList', getDestinationList);
router.post('/busSearch', authMiddleware, busSearch);
router.post('/seatLayout', authMiddleware, seatLayout);

module.exports = router;
