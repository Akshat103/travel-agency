const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateClientId = () => {
    const uuid = uuidv4().replace(/-/g, '').toUpperCase();
    return uuid.substring(0, 10);
};

const userSchema = new mongoose.Schema({
    clientId: {
        type: String,
        unique: true,
        default: generateClientId
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    userType: {
        type: Number,
        enum: {
            values: [0, 1, 2],
            message: 'User type must be 0, 1, or 2'
        },
        required: [true, 'User type is required']
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
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('clientId')) {
        this.clientId = generateClientId();
        while (await mongoose.models.User.exists({ clientId: this.clientId })) {
            this.clientId = generateClientId();
        }
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        while (await mongoose.models.User.exists({ clientId: this.clientId })) {
            this.clientId = generateClientId();
        }
    }
    next();
});

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

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ clientId: this.clientId, userType: this.userType }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    });
};

module.exports = mongoose.model('User', userSchema);
