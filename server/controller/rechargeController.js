require('dotenv').config();
const axios = require('axios');
const RechargeLog = require('../models/RechargeLog');

const { MEMBER_ID, RECHARGE_PIN, RECHARGE_API_URL, RECHARGE_CR_OP_PASS, RECHARGE_PLAN_PASS } = process.env;

// Get Balance
const getBalance = async (req, res) => {
    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/api/GetOperator.aspx`,
            {
                params: {
                    memberid: MEMBER_ID,
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
                memberid: MEMBER_ID,
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
                memberid: MEMBER_ID,
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

const rechargeRequest = async (number, operator, circle, amount, orderid, clientId, RechargeMode = 0) => {

    try {
        const response = await axios.get(
            `${RECHARGE_API_URL}/services_cyapi/recharge_cyapi.aspx`,
            {
                params: {
                    memberid: MEMBER_ID,
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
            clientId: clientId,
            usertx: orderid,
            number,
            amount,
            status: response.data.Status || 'Unknown',
            transaction: response.data.ApiTransID || 'No Transaction ID',
            entryLog: response.data,
        });

        await rechargeLog.save();
        return true;
    } catch (error) {
        const errorLog = new RechargeLog({
            clientId: clientId,
            status: 'Failed',
            transaction: 'No Transaction ID',
            entryLog: { error: error.message },
        });

        await errorLog.save();

        throw new Error(error.message);
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
                    memberid: MEMBER_ID,
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
                    memberid: MEMBER_ID,
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

const fetchCircleOperator = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const response = await axios.get(`${RECHARGE_API_URL}/API/CyrusOperatorFatchAPI.aspx`, {
            params: {
                APIID: MEMBER_ID,
                PASSWORD: RECHARGE_CR_OP_PASS,
                MOBILENUMBER: mobileNumber
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data.' });
    }
};

const fetchPlans = async (req, res) => {
    const { operatorCode, circleCode, mobileNumber } = req.body;

    try {
        const response = await axios.get(`${RECHARGE_API_URL}/API/CyrusPlanFatchAPI.aspx`, {
            params: {
                APIID: MEMBER_ID,
                PASSWORD: RECHARGE_PLAN_PASS,
                Operator_Code: operatorCode,
                Circle_Code: circleCode,
                MobileNumber: mobileNumber,
                data: 'ALL'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data from Cyrus Plan API' });
    }
};


module.exports = {
    getBalance,
    getCircle,
    getOperator,
    rechargeRequest,
    disputeRequest,
    checkStatus,
    fetchCircleOperator,
    fetchPlans
};
