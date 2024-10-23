const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define user schema
const userSchema = new mongoose.Schema({
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    userType: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'User type must be 0 or 1'
        },
        default: 1
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^.+@.+\..+$/.test(v);
            },
            message: 'Email is invalid'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: 'Gender must be Male, Female, or Other'
        },
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (v) {
                return v instanceof Date && !isNaN(v);
            },
            message: 'Date of birth is invalid'
        }
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token method
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ clientId: this.clientId, userType: this.userType }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', userSchema);
