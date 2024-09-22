const express = require("express");
const router = express.Router();
const paymentsController = require("../controller/paymentController");
const {authMiddleware} = require('../middleware/authMiddleware');

router.post("/create-order", authMiddleware, paymentsController.createOrder);

router.post("/verify-payment", authMiddleware, paymentsController.verifyOrder);

module.exports = router;