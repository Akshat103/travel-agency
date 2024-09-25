const express = require('express');
const router = express.Router();
const { getSourceList, getDestinationList, busSearch, busBook } = require('../controller/busController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/getSourceList', getSourceList);
router.post('/getDestinationList', getDestinationList);
router.post('/busSearch', authMiddleware, busSearch);
router.post('/busBook', authMiddleware, busBook);

module.exports = router;
