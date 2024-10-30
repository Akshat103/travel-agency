const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require("crypto");
const OrderSchema = require('../models/Order');
const { rechargeRequest } = require('./rechargeController');
const { busSeatbook } = require('./busController');
const { bookFlight } = require('./flightController');
const { onboardIRCTC } = require('./irctcController');
const IRCTC = require('../models/IRCTC');
const createConformationPDF = require('../email/createBookingPDF');
const sendConformationEmail = require('../email/sendConformationEmail');
const logger = require('../utils/logger');
const User = require('../models/User');

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
    let razorpay_payment_id, razorpay_order_id;
    try {
        // Destructure the necessary fields from the request body
        const { razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature, serviceType } = req.body;
        razorpay_payment_id = paymentId;
        razorpay_order_id = orderId;
        const clientId = req.user.clientId;

        // Verify signature
        const body = `${orderId}|${paymentId}`;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = generated_signature === razorpay_signature;

        if (!isAuthentic) {
            await OrderSchema.findOneAndUpdate(
                { orderId: orderId },
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
            { orderId: orderId },
            { status: 'paid' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Handle the service types and success responses
        let successMessage = '';
        let serviceData = null;

        switch (serviceType) {
            case 'recharge':
                const { number, operator, circle, amount } = updatedOrder.serviceDetails;
                const rechargeSuccess = await rechargeRequest(number, operator, circle, amount, orderId);
                if (rechargeSuccess) {
                    successMessage = "Recharge done successfully.";
                } else {
                    throw new Error("Recharge failed");
                }
                break;

            case 'bookbus':
                const busResponse = await busSeatbook(updatedOrder.serviceDetails, clientId, orderId);
                if (busResponse.booking_status === 'BOOKED') {
                    successMessage = "Bus booking done successfully.";
                    serviceData = busResponse;
                } else {
                    throw new Error("Bus Booking failed");
                }
                break;

            case 'bookflight':
                const flightSuccess = await bookFlight(updatedOrder.serviceDetails, clientId, orderId);
                if (flightSuccess.data.statuscode === 100) {
                    successMessage = "Flight booking done successfully.";
                    serviceData = flightSuccess.data;
                } else {
                    throw new Error("Flight Booking failed");
                }
                break;

            case 'irctcOnboard':
                const userDetails = await IRCTC.findOne({ clientId: updatedOrder.clientId });
                const irctcOrder = await OrderSchema.findOneAndUpdate(
                    { orderId: orderId },
                    { serviceDetails: userDetails },
                    { new: true }
                );
                const onboardSuccess = await onboardIRCTC(irctcOrder.serviceDetails, clientId, orderId);
                if (onboardSuccess.status === 'success') {
                    successMessage = "IRCTC onboard done successfully.";
                    serviceData = onboardSuccess;
                } else {
                    throw new Error(onboardSuccess.data);
                }
                break;

            default:
                throw new Error("Invalid service type");
        }

        // Send the success response
        res.status(201).json({
            success: true,
            message: successMessage,
            data: serviceData
        });

        try {

            const user = await User.findOne({ clientId: req.user.clientId });
            const order = await OrderSchema.findOne({ orderId: updatedOrder.orderId });

            // Generate the confirmation PDF
            const pdfFilePath = await createConformationPDF(user, order);

            // Log successful PDF creation
            logger.info(`PDF created successfully: ${pdfFilePath}`);

            // Send confirmation email with the generated PDF
            await sendConformationEmail(user, order, pdfFilePath);

            logger.info("Confirmation email sent successfully!");
        } catch (error) {
            logger.error("Error in PDF creation or sending confirmation email:", error);
        }

    } catch (error) {
        // Handle booking failure, initiate refund
        await initiateRefund(razorpay_payment_id);
        await OrderSchema.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'failed' }
        );

        // Only send error response if headers haven't been sent yet
        if (!res.headersSent) {
            return res.status(400).json({
                success: false,
                message: "Booking failed, refund initiated.",
                error: error.message
            });
        } else {
            logger.error("Error occurred after response was sent:", error.message);
        }
    }
};


