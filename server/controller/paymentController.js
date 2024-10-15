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
    try {
        // Destructure the necessary fields from the request body
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, serviceType } = req.body;

        // Check if all required fields are available
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !serviceType) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment or service information",
                error: "Required fields: razorpay_payment_id, razorpay_order_id, razorpay_signature, serviceType"
            });
        }

        const clientId = req.user.clientId;

        // Verify signature
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = generated_signature === razorpay_signature;

        if (!isAuthentic) {
            await OrderSchema.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { status: 'failed' }
            );
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
                error: "Generated signature does not match the provided signature"
            });
        }

        // Find and update the order status to 'paid'
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

        // Service-based handling
        try {
            let response;
            switch (serviceType) {
                case 'recharge':
                    const { number, operator, circle, amount } = updatedOrder.serviceDetails;

                    if (!number || !operator || !circle || !amount) {
                        throw new Error("Missing recharge details");
                    }

                    const rechargeSuccess = await rechargeRequest(number, operator, circle, amount, razorpay_order_id);
                    if (rechargeSuccess) {
                        return res.status(201).json({
                            success: true,
                            message: "Recharge done successfully."
                        });
                    } else {
                        throw new Error("Recharge failed");
                    }

                case 'bookbus':
                    response = await busSeatbook(updatedOrder.serviceDetails, clientId);
                    return res.status(201).json({
                        success: true,
                        message: "Bus booking done successfully.",
                        data: response
                    });

                case 'bookflight':
                    response = await bookFlight(updatedOrder.serviceDetails, clientId);
                    return res.status(201).json({
                        success: true,
                        message: "Flight booking done successfully.",
                        data: response
                    });

                default:
                    throw new Error("Invalid service type");
            }
        } catch (error) {
            // Handle booking failure, initiate refund
            await initiateRefund(razorpay_payment_id);
            await OrderSchema.findOneAndUpdate(
                { orderId: razorpay_order_id },
                { status: 'failed' }
            );

            return res.status(400).json({
                success: false,
                message: "Booking failed, refund initiated.",
                recharge: false,
                error: error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


