const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    serviceDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
