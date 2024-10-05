const express = require('express');
const router = express.Router();
const flightController = require('../controller/flightController');
const {authMiddleware} = require('../middleware/authMiddleware');

// Route to get airports from cities
router.get('/flightcity', flightController.getFlightCities);

// Route to search flights
router.post('/flightsearch', authMiddleware, flightController.searchFlights);

router.post('/getssr', authMiddleware, flightController.airGetSSR);

module.exports = router;
