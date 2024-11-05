import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const ServiceChargePage = () => {
    const [services, setServices] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [name, setName] = useState('');
    const [charge, setCharge] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services');
            if (Array.isArray(response.data)) {
                setServices(response.data);
            } else {
                console.error('Expected an array, but got:', response.data);
                setServices([]);
                setErrorMessage('Error fetching services. Unexpected data format.');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setErrorMessage('Error fetching services. Please try again later.');
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddService = async () => {
        if (!name || !charge) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        try {
            await axios.post('/api/services/add', { name, charge });
            fetchServices();
            setShowAddModal(false);
            setName('');
            setCharge('');
        } catch (error) {
            setErrorMessage('Error adding service. Ensure the name is unique.');
        }
    };

    const handleDeleteService = async (serviceName) => {
        try {
            await axios.delete(`/api/services/delete/${serviceName}`);
            fetchServices();
        } catch (error) {
            setErrorMessage('Error deleting service. It may not exist.');
        }
    };

    const handleEditService = (service) => {
        setCurrentService(service);
        setName(service.name);
        setCharge(service.charge);
        setShowEditModal(true);
    };

    const handleUpdateServiceCharge = async () => {
        if (!charge) {
            setErrorMessage('Charge cannot be empty.');
            return;
        }
        try {
            await axios.put(`/api/services/update/${currentService.name}`, { charge });
            fetchServices();
            setShowEditModal(false);
            setCurrentService(null);
            setName('');
            setCharge('');
        } catch (error) {
            setErrorMessage('Error updating service charge. Please try again.');
        }
    };

    return (
        <div>
            {/* Info Message */}
            <Alert variant="danger" className="mt-3">
                Note: Services with names "Flight," "Recharge," "Hotel," "Bus," and "IRCTC" should not be deleted.
                If deleted, they need to be recreated.
            </Alert>

            <div className='d-flex justify-content-between'>
                <p style={{ fontSize: '1.5rem', color: 'black' }}>Service Charges</p>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>Add New Service</Button>
            </div>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Charge</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.name}>
                            <td>{service.name}</td>
                            <td>
                                {service.name === "IRCTC" ? `${service.charge} Rs` : `${service.charge} %`}
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditService(service)}>
                                    <FaEdit /> Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteService(service.name)}>
                                    <FaTrash /> Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Service Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!name}
                            />
                            <Form.Control.Feedback type="invalid">
                                Service name is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Charge</Form.Label>
                            <Form.Control
                                type="number"
                                value={charge}
                                onChange={(e) => setCharge(e.target.value)}
                                isInvalid={!charge}
                            />
                            <Form.Control.Feedback type="invalid">
                                Charge is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddService}>Add Service</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Service Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service Charge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control type="text" value={name} readOnly />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Charge</Form.Label>
                            <Form.Control
                                type="number"
                                value={charge}
                                onChange={(e) => setCharge(e.target.value)}
                                isInvalid={!charge}
                            />
                            <Form.Control.Feedback type="invalid">
                                Charge is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateServiceCharge}>Update Charge</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ServiceChargePage;
