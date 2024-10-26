const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const IRCTC = require('../models/IRCTC');
const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/// Google Authentication routes
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${FRONTEND_URL}/login`,
        session: false
    }),
    async (req, res) => {
        try {
            const user = req.user;
            // Generate JWT token
            const token = jwt.sign(
                {
                    clientId: user.clientId,
                    userType: user.userType
                },
                process.env.JWT_SECRET
            );

            // Check IRCTC status
            const irctcDetails = await IRCTC.findOne({ clientId: user.clientId });
            const irctc = irctcDetails?.active ? 1 : 0;

            // Set cookie
            res.cookie('sessionId', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });


            // For API response consistency, we'll redirect with query params
            res.redirect(
                `${FRONTEND_URL}/auth/callback?` +
                `status=success&` +
                `userType=${user.userType}&` +
                `irctc=${irctc}`
            );
        } catch (error) {
            console.error('Google auth error:', error);
            res.redirect(`${FRONTEND_URL}/login?error=authentication_failed`);
        }
    }
);

// Handle the frontend callback
router.get('/google/success', async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const irctcDetails = await IRCTC.findOne({ clientId: user.clientId });
        const irctc = irctcDetails?.active ? 1 : 0;

        res.status(200).json({
            message: 'Login successful',
            userType: user.userType,
            irctc
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;