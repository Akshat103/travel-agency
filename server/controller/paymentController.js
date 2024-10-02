const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require("crypto");
const OrderSchema = require('../models/Order');
const { rechargeRequest } = require('./rechargeController');
const { busSeatbook } = require('./busController');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_ID,
});

// Generalized createOrder function
module.exports.createOrder = async (req, res) => {
    try {
        const { amount, receipt, serviceType, serviceDetails } = req.body;
        const clientId = req.user.clientId;

        const options = {
            amount: Number(amount * 100),
            currency: 'INR',
            receipt: receipt,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        const newOrder = new OrderSchema({
            clientId,
            serviceType,
            serviceDetails,
            orderId: order.id,
            amount: order.amount / 100,
            currency: order.currency,
            status: 'created'
        });

        await newOrder.save();

        res.json({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            serviceType: newOrder.serviceType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

// Generalized verifyOrder function
module.exports.verifyOrder = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, serviceType } = req.body;
    const clientId = req.user.clientId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = generated_signature === razorpay_signature;

    if (isAuthentic) {
        const updatedOrder = await OrderSchema.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'paid' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (serviceType === 'recharge') {
            const { number, operator, circle, amount } = updatedOrder.serviceDetails;
            await rechargeRequest(number, operator, circle, amount, orderid = razorpay_order_id, clientId);
            return res.status(201).json({
                success: true,
                message: `${serviceType} done successfully.`
            });
        } else if (serviceType === 'bookbus') {
            const response = await busSeatbook(updatedOrder.serviceDetails, clientId);
            return res.status(201).json({
                success: true,
                message: `${serviceType} done successfully.`,
                data: response
            });
        }

    } else {
        await OrderSchema.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'failed' }
        );

        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};

