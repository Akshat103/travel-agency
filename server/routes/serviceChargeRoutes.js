const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceChargeController');

// Route to get all services
router.get('/', serviceController.getAllServices);

// Route to get a service by name
router.get('/:name', serviceController.getServiceByName);

// Route to add a new service
router.post('/add', serviceController.addService);

// Route to delete a service by name
router.delete('/delete/:name', serviceController.deleteService);

// Route to update a service charge by name
router.put('/update/:name', serviceController.updateServiceCharge);

module.exports = router;
