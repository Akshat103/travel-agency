const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authMiddleware, checkUserType} = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);


// Get all users
router.get('/users', authMiddleware, checkUserType(0), userController.getUsersByName);
// Get a user by client ID
router.get('/user-by-id', authMiddleware, userController.getUserById);
// Update a user by client ID
router.put('/update-user', authMiddleware, userController.updateUser);

router.put('/users/switch-type/:clientId', userController.switchUserType);
// Delete a user by client ID
router.delete('/delete-user', authMiddleware, userController.deleteUser);

module.exports = router;
