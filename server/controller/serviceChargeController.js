const Service = require('../models/ServiceCharges');

// Add a new service
const addService = async (req, res) => {
    const { name, charge } = req.body;

    try {
        const newService = new Service({ name, charge });
        await newService.save();
        res.status(201).json({ message: 'Service added successfully', service: newService });
    } catch (error) {
        res.status(400).json({ message: 'Error adding service', error });
    }
};

// Delete a service by name
const deleteService = async (req, res) => {
    const { name } = req.params;

    try {
        const deletedService = await Service.findOneAndDelete({ name });
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });

        res.status(200).json({ message: 'Service deleted successfully', service: deletedService });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting service', error });
    }
};

// Update a service charge by name
const updateServiceCharge = async (req, res) => {
    const { name } = req.params;
    const { charge } = req.body;

    try {
        const updatedService = await Service.findOneAndUpdate(
            { name },
            { charge },
            { new: true }
        );
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });

        res.status(200).json({ message: 'Service charge updated successfully', service: updatedService });
    } catch (error) {
        res.status(400).json({ message: 'Error updating service charge', error });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
};

// Get a service by name
const getServiceByName = async (req, res) => {
    const { name } = req.params;

    try {
        const service = await Service.findOne({ name });
        if (!service) return res.status(404).json({ message: 'Service not found' });

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
};

module.exports = {
    addService,
    deleteService,
    updateServiceCharge,
    getAllServices,
    getServiceByName
};