const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authMiddleware} = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.createUser);

// Login a user
router.post('/login', userController.loginUser);

// Get all users
router.get('/users', authMiddleware, userController.getAllUsers);

// Get a user by client ID
router.get('/user-by-id', authMiddleware, userController.getUserById);

// Update a user by client ID
router.put('/update-user', authMiddleware, userController.updateUser);

// Delete a user by client ID
router.delete('/delete-user', authMiddleware, userController.deleteUser);

router.post('/logout', userController.logoutUser);

module.exports = router;
