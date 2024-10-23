const crypto = require('crypto');
const IRCTC = require('../models/IRCTC');
const OrderSchema = require('../models/Order');
const User = require('../models/User');
const axios = require('axios');

const { MEMBER_ID, IRCTC_URL, IRCTC_PIN, IRCTC_COST } = process.env;

const onboardUser = async (req, res) => {
    try {
        const { name, email, mobile, agencyName, agencyAddress, imei, mac, state, city } = req.body;

        const { panImage, aadharFront, shopProof, selfPhoto } = req.urls;

        const requiredFields = [
            name, email, mobile, agencyName, agencyAddress,
            imei, mac, state, city, panImage, aadharFront,
            shopProof, selfPhoto
        ];

        for (const field of requiredFields) {
            if (!field) {
                return res.status(400).json({ success: false, error: 'All fields are required' });
            }
        }

        const formattedName = name.replace(/\s+/g, '').toLowerCase();
        const formattedAgencyName = agencyName.replace(/\s+/g, '').toLowerCase();
        const salt = crypto.randomBytes(3).toString('hex');
        const uniqueUserId = `${formattedName}-${formattedAgencyName}-${salt}`;

        const existingIrctc = await IRCTC.findOne({ clientId: req.user.clientId });

        if (existingIrctc) {
            if (!existingIrctc.active) {

                Object.assign(existingIrctc, {
                    name,
                    email,
                    mobile,
                    uniqueUserId,
                    agencyName,
                    agencyAddress,
                    imei,
                    mac,
                    state,
                    city,
                    panImage,
                    aadharFront,
                    shopProof,
                    selfPhoto
                });

                await existingIrctc.save();

                return res.status(200).json({ success: true, message: 'User details uploaded' });
            } else {
                return res.status(400).json({ success: false, error: 'User is already active.' });
            }
        } else {
            const irctc = new IRCTC({
                clientId: req.user.clientId,
                name,
                email,
                mobile,
                uniqueUserId,
                agencyName,
                agencyAddress,
                imei,
                mac,
                state,
                city,
                panImage,
                aadharFront,
                shopProof,
                selfPhoto
            });
            await irctc.save();

            return res.status(200).json({ success: true, message: 'User details uploded' });
        }
    } catch (error) {
        console.error('Error onboarding user:', error);
        res.status(500).json({ success: false, error: 'Failed to onboard user' });
    }
};

const onboardIRCTC = async (details, clientId, orderid) => {

    const { name, email, mobile, uniqueUserId, panImage, aadharFront, agencyName, agencyAddress, imei, mac, state, city, shopProof, selfPhoto } = details;

    const options = {
        method: 'POST',
        url: IRCTC_URL,
        data: {
            methodname: 'onboard',
            MerchantID: MEMBER_ID,
            MerchantKey: IRCTC_PIN,
            name,
            email,
            mobile,
            uniqueuserid: uniqueUserId,
            panimage: panImage,
            aadharfront: aadharFront,
            AgencyName: agencyName,
            AgencyAddress: agencyAddress,
            Imei: imei,
            Mac: mac,
            state,
            city,
            ShopProof: shopProof,
            SelfPhoto: selfPhoto
        }
    };

    try {
        const response = await axios(options);
        const updatedOrder = await OrderSchema.findOneAndUpdate(
            { orderId: orderid },
            { serviceResponse: response.data },
            { new: true }
        );
        if (!updatedOrder) {
            throw new Error('Failed to update order with irctc onboard response');
        }
        if (response.data.status === 'success') {
            const irctc = await IRCTC.findOneAndUpdate(
                { clientId: clientId },
                { active: true },
                { new: true }
            );
            if (!irctc) {
                throw new Error('Failed to update order with irctc onboard response');
            }
        }
        return response.data;
    } catch (error) {
        console.error('Error calling Cyrus API:', error);
        throw error;
    }
};

const getIrctcCost = async (req, res) => {
    if (!IRCTC_COST) {
        res.status(500).json({ success: false, error: 'Cost not avilable. Try later.' });
    }
    res.status(200).json({ success: true, cost: IRCTC_COST });
}

const getIrctc = async (req, res) => {
    try {
        const clientId = req.user.clientId;

        const irctc = await IRCTC.findOne({ clientId });

        if (!irctc) {
            return res.status(404).json({ error: 'IRCTC record not found' });
        }

        const uniqueUserId = irctc.uniqueUserId;
        const redirectUrl = `${IRCTC_URL}?method=login&memberid=${MEMBER_ID}&pin=${IRCTC_PIN}&uniqueidforuser=${uniqueUserId}`;

        res.status(200).json({ success: true, link: redirectUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    onboardUser,
    onboardIRCTC,
    getIrctcCost,
    getIrctc
};
