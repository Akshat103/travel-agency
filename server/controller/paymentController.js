const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require("crypto");
const OrderSchema = require('../models/Order');
const { rechargeRequest } = require('./rechargeController');
const { busSeatbook } = require('./busController');
const { bookFlight } = require('./flightController');

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

async function initiateRefund(paymentId) {
    try {
        const refund = await razorpay.payments.refund(paymentId);
        return refund;
    } catch (error) {
        console.error('Refund failed:', error);
        throw error;
    }
}

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

        try {
            let response;
            if (serviceType === 'recharge') {
                const { number, operator, circle, amount } = updatedOrder.serviceDetails;
                await rechargeRequest(number, operator, circle, amount, razorpay_order_id);
                return res.status(201).json({
                    success: true,
                    message: "Recharge done successfully."
                });
            } else if (serviceType === 'bookbus') {
                response = await busSeatbook(updatedOrder.serviceDetails, clientId);
                return res.status(201).json({
                    success: true,
                    message: "Bus booking done successfully.",
                    data: response
                });
            } else if (serviceType === 'bookflight') {
                response = await bookFlight(updatedOrder.serviceDetails, clientId);
                return res.status(201).json({
                    success: true,
                    message: "Flight booking done successfully.",
                    data: response
                });
            }
        } catch (error) {
            // Initiate refund on failure
            await initiateRefund(razorpay_payment_id);
            await OrderSchema.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { status: 'failed' }
            );

            return res.status(400).json({
                order: false,
                success: false,
                message: "Booking failed, refund initiated.",
                error: error.message
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


