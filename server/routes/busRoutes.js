const express = require('express');
const router = express.Router();
const { getSourceList, getDestinationList, busSearch } = require('../controller/busController');

router.get('/getSourceList', getSourceList);
router.post('/getDestinationList', getDestinationList);
router.post('/busSearch', busSearch);

module.exports = router;
