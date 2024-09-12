require('dotenv').config();
const axios = require('axios');
const RechargeLog = require('../models/RechargeLog');
const { response } = require('express');

const { RECHARGE_MEMBER_ID, RECHARGE_PIN, RECHARGE_API_URL } = process.env;

// Get Balance
const getBalance = async (req, res) => {
    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/api/GetOperator.aspx`,
            {
                params: {
                    memberid: RECHARGE_MEMBER_ID,
                    pin: RECHARGE_PIN,
                    Method: 'getbalance'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCircle = async (req, res) => {
    try {
        const response = await axios.get(`${RECHARGE_API_URL}/api/GetOperator.aspx`, {
            params: {
                memberid: RECHARGE_MEMBER_ID,
                pin: RECHARGE_PIN,
                Method: 'getcircle'
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching circle codes:', error.message);
        res.status(500).json({ error: 'Failed to fetch circle codes.' });
    }
};


const getOperator = async (req, res) => {
    RECHARGE_API_URL
    try {
        const response = await axios.get(`${RECHARGE_API_URL}/api/GetOperator.aspx`, {
            params: {
                memberid: RECHARGE_MEMBER_ID,
                pin: RECHARGE_PIN,
                Method: 'getoperator'
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching operator codes:', error.message);
        res.status(500).json({ error: 'Failed to fetch operator codes.' });
    }
};

const generateOrderId = () => {
    return Math.random().toString(36).slice(2, 12).toUpperCase();
};

const rechargeRequest = async (req, res) => {
    const { number, operator, circle, amount, RechargeMode = 0 } = req.body;
    const orderid = generateOrderId(); 

    console.log(req.user.clientId);

    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/services_cyapi/recharge_cyapi.aspx`,
            {
                params: {
                    memberid: RECHARGE_MEMBER_ID,
                    pin: RECHARGE_PIN,
                    number,
                    operator,
                    circle,
                    amount,
                    usertx: orderid,
                    format: 'json',
                    RechargeMode,
                },
            }
        );

        const rechargeLog = new RechargeLog({
            clientId: req.user.clientId,
            usertx: orderid,
            number,
            amount,
            status: response.data.Status || 'Unknown',
            transaction: response.data.ApiTransID || 'No Transaction ID',
            entryLog: response.data,
        });

        await rechargeLog.save();
        res.json(response.data);
    } catch (error) {
        const errorLog = new RechargeLog({
            clientId: req.user.clientId,
            status: 'Failed',
            transaction: 'No Transaction ID',
            entryLog: { error: error.message },
        });

        await errorLog.save();

        res.status(500).json({ error: error.message });
    }
};


// Dispute Request
const disputeRequest = async (req, res) => {
    const { transid, reason } = req.query;
    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/api/api_raise_dispute.aspx`,
            {
                params: {
                    memberid: RECHARGE_MEMBER_ID,
                    RECHARGE_PIN: RECHARGE_PIN,
                    transid,
                    reason,
                }
            }
        );
        res.json(response.data || { message: 'No response body returned' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Status Check
const checkStatus = async (req, res) => {
    const { transid } = req.query;
    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/api/rechargestatus.aspx`,
            {
                params: {
                    memberid: RECHARGE_MEMBER_ID,
                    RECHARGE_PIN: RECHARGE_PIN,
                    transid,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBalance,
    getCircle,
    getOperator,
    rechargeRequest,
    disputeRequest,
    checkStatus,
};
