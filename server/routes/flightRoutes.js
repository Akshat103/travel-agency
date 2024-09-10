const express = require('express');
const router = express.Router();
const flightController = require('../controller/flightController');

// Route to get airports from cities
router.get('/flightcity', flightController.getFlightCities);

// Route to search flights
router.post('/flightsearch', flightController.searchFlights);

module.exports = router;
