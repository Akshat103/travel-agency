const express = require('express');
const router = express.Router();
const mailController = require('../controller/mailController');

router.post('/contact', mailController.sendContactMail);

module.exports = router;
