const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // To generate random salt
const logger = require('../utils/logger');

// Define the upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to generate a random salt
const generateSalt = () => crypto.randomBytes(8).toString('hex');

// Define multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        let prefix;
        
        // Set filename prefix based on fieldname
        switch (file.fieldname) {
            case 'panImage':
                prefix = 'PAN';
                break;
            case 'aadharFront':
                prefix = 'AADHAR';
                break;
            case 'shopProof':
                prefix = 'SHOP';
                break;
            case 'selfPhoto':
                prefix = 'SELF';
                break;
            default:
                prefix = 'FILE';
        }

        // Generate unique filename with salt
        const uniqueFilename = `${prefix}-${Date.now()}-${generateSalt()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);

        // Log the successful upload
        logger.info(`Uploaded file: ${uniqueFilename}`);
    }
});

// Set up multer to limit file size and filter file types
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        logger.error(`File upload error: ${file.originalname} - Unsupported file type`); // Log error
        cb(new Error('Error: File type not supported!'));
    }
});

// Middleware for multiple file uploads with specific field names
const multipleUpload = (req, res, next) => {
    const serverIp = process.env.SERVER || 'http://localhost:5000';
    req.urls = {};

    // Check if the files were uploaded and map URLs for each expected file type
    if (req.files) {
        if (req.files.panImage) {
            const panImageUrl = `${serverIp}/uploads/${encodeURIComponent(req.files.panImage[0].filename)}`;
            req.urls.panImage = panImageUrl;
            logger.info(`PAN Image available at: ${panImageUrl}`);
        }
        if (req.files.aadharFront) {
            const aadharFrontUrl = `${serverIp}/uploads/${encodeURIComponent(req.files.aadharFront[0].filename)}`;
            req.urls.aadharFront = aadharFrontUrl;
            logger.info(`Aadhar Front available at: ${aadharFrontUrl}`);
        }
        if (req.files.shopProof) {
            const shopProofUrl = `${serverIp}/uploads/${encodeURIComponent(req.files.shopProof[0].filename)}`;
            req.urls.shopProof = shopProofUrl;
            logger.info(`Shop Proof available at: ${shopProofUrl}`);
        }
        if (req.files.selfPhoto) {
            const selfPhotoUrl = `${serverIp}/uploads/${encodeURIComponent(req.files.selfPhoto[0].filename)}`;
            req.urls.selfPhoto = selfPhotoUrl;
            logger.info(`Self Photo available at: ${selfPhotoUrl}`);
        }
    }

    next();
};

// Export the upload middleware and multipleUpload function
module.exports = { 
    upload: upload.fields([
        { name: 'panImage', maxCount: 1 },
        { name: 'aadharFront', maxCount: 1 },
        { name: 'shopProof', maxCount: 1 },
        { name: 'selfPhoto', maxCount: 1 }
    ]),
    multipleUpload
};
