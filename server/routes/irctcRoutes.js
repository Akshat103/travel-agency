const express = require('express');
const router = express.Router();
const { upload, multipleUpload } = require('../config/multer');
const irctcController = require('../controller/irctcController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/onboard', authMiddleware, upload, multipleUpload, irctcController.onboardUser);
router.get('/get-cost', authMiddleware, irctcController.getIrctcCost);
router.get('/get-irctc', authMiddleware, irctcController.getIrctc);

module.exports = router;
