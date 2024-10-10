const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, userType, mobileNumber, email, gender, dateOfBirth, state, password } = req.body;
    const user = new User({ name, userType, mobileNumber, email, gender, dateOfBirth, state, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (emailOrMobile === process.env.ADMIN && password === process.env.ADMIN_PASS) {
      const adminToken = jwt.sign({ userType: 0 }, process.env.JWT_SECRET, {
        expiresIn: '12h',
      });
      
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

    res.status(200).json({
      message: 'Login successful',
      userType: user.userType,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser
};
