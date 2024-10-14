const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

const dbConnect = async () => {
  try {
    // Ensure the MongoDB URI is present
    if (!process.env.MONGO_URI) {
      logger.error('MongoDB URI not found in environment variables');
      throw new Error('MONGO_URI not set in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI);

    logger.info('Database connected successfully');
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    
    // Optional: Log the full error stack in case of development mode
    if (process.env.NODE_ENV !== 'production') {
      logger.error(error.stack);
    }

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = dbConnect;
