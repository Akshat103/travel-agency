const mongoose = require('mongoose');

const rechargeLogSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  transaction: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  entryLog: {
    type: Object, // Stores the entire request or response if needed
    required: true,
  },
});

module.exports = mongoose.model('RechargeLog', rechargeLogSchema);
