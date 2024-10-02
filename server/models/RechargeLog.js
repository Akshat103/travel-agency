const mongoose = require('mongoose');

const rechargeLogSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  usertx: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  amount: {
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
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('RechargeLog', rechargeLogSchema);
