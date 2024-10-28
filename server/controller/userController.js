const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const IRCTC = require('../models/IRCTC');
require('dotenv').config();

const generateClientId = () => {
    const uuid = uuidv4().replace(/-/g, '').toUpperCase();
    return uuid.substring(0, 10);
};

const createUser = async (req, res) => {
  try {
      const { name, mobileNumber, email, password } = req.body;

      // Check for missing required fields
      if (!name || !mobileNumber || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
      }

      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobileNumber)) {
          return res.status(400).json({ error: 'Invalid mobile number format' });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ error: 'Email already exists' });
      }

      // Check if the mobile number already exists
      const existingMobile = await User.findOne({ mobileNumber });
      if (existingMobile) {
          return res.status(409).json({ error: 'Mobile number already exists' });
      }

      // Generate a unique clientId
      const clientId = generateClientId();

      // Create a new user instance
      const user = new User({
          clientId,
          name,
          mobileNumber,
          email,
          password
      });

      // Save the user to the database
      await user.save();

      res.status(201).json({ message: 'User created successfully', clientId });
  } catch (error) {
      // Handle validation errors, database errors, and other possible issues
      if (error.name === 'ValidationError') {
          return res.status(400).json({ error: `Validation error: ${error.message}` });
      }
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (emailOrMobile === process.env.ADMIN && password === process.env.ADMIN_PASS) {
      const adminToken = jwt.sign({ userType: 0 }, process.env.JWT_SECRET);

      res.cookie('sessionId', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json({
        message: 'Admin login successful',
        userType: 0,
      });
    }

    // Regular user login
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();

    res.cookie('sessionId', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const clientId = user.clientId;

    const irctcDetails = await IRCTC.findOne({clientId});

    let irctc = 0;

    if(irctcDetails && irctcDetails.active){
      irctc = 1;
    }

    res.status(200).json({
      message: 'Login successful',
      userType: user.userType,
      irctc
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLatestUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all users
const getUsersByName = async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, 'i');
    const users = await User.find({ name: { $regex: regex } });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a user by client ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ clientId: req.user.clientId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user by client ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { clientId: req.user.clientId },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by client ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ clientId: req.user.clientId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const switchUserType = async (req, res) => {
  try {
    const { clientId } = req.params;

    const user = await User.findOne({ clientId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.userType = user.userType === 0 ? 1 : 0;

    await user.save();

    res.status(200).json({
      success: true,
      message: `User type switched successfully`,
      userType: user.userType
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getLatestUsers,
  getUsersByName,
  getUserById,
  updateUser,
  switchUserType,
  deleteUser,
  logoutUser
};
