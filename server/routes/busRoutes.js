const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/getSourceList', busController.getSourceList);
router.post('/getDestinationList', busController.getDestinationList);
router.post('/busSearch', authMiddleware, busController.busSearch);
router.post('/seatLayout', authMiddleware, busController.seatLayout);
router.post('/busBook', authMiddleware, busController.busSeatbook);

module.exports = router;
