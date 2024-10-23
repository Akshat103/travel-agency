const mongoose = require('mongoose');

const irctcSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^.+@.+\..+$/.test(v);
            },
            message: 'Email is invalid'
        }
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    uniqueUserId: {
        type: String,
        required: true,
        unique: true
    },
    agencyName: {
        type: String,
        required: [true, 'Agency Name is required']
    },
    agencyAddress: {
        type: String,
        required: [true, 'Agency Address is required']
    },
    imei: {
        type: String,
        required: [true, 'IMEI is required']
    },
    mac: {
        type: String,
        required: [true, 'MAC address is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    panImage: {
        type: String,
        required: [true, 'PAN Image URL is required']
    },
    aadharFront: {
        type: String,
        required: [true, 'Aadhar Front Image URL is required']
    },
    shopProof: {
        type: String,
        required: [true, 'Shop Proof Image URL is required']
    },
    selfPhoto: {
        type: String,
        required: [true, 'Self Photo Image URL is required']
    },
    active: {
        type: Boolean,
        default: false
    },
    serviceResponse: {
        type: mongoose.Schema.Types.Mixed
    },
}, { timestamps: true });

module.exports = mongoose.model('IRCTC', irctcSchema);
