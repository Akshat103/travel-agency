import axios from 'axios';
import React, { useState } from 'react';
import usePayment from '../../utils/payment';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';

const OnboardUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        agencyName: '',
        agencyAddress: '',
        imei: '',
        mac: '',
        state: '',
        city: '',
        panImage: null,
        aadharFront: null,
        shopProof: null,
        selfPhoto: null,
    });

    const { payment } = usePayment();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0], // Store the first file selected
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSubmit.append(key, formData[key]);
        });

        try {
            const storeService = await axios.post('/api/irctc/onboard', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = storeService.data;

            if (data.success) {
                const constResponse = await axios.get('/api/irctc/get-cost');

                let amount;

                if (constResponse.data.success) {
                    amount = constResponse.data.cost;
                }
                else {
                    toast.error(constResponse.data.error);
                    return;
                }

                const receipt = `irctc_onboard_rcptid_${Math.floor(Math.random() * 10000)}`;
                const serviceType = "irctcOnboard";
                payment(amount, receipt, serviceType);
            } else {
                toast.error(data.error);
                return;
            }
        } catch (error) {
            console.error('Error onboarding user:', error);
        }

    };

    return (
        <Container>
            <div className="row m-2">
            <div className="col-12 text-center">
              <h3
                className="fw-bold text-white p-4 rounded"
                style={{
                  background: '#282a29',
                  borderRadius: '10px',
                  fontSize: '1.2rem'
                }}
              >
                IRCTC User Onboarding
              </h3>
            </div>
          </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                placeholder="Enter your mobile number"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formAgencyName">
                            <Form.Label>Agency Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="agencyName"
                                placeholder="Enter agency name"
                                value={formData.agencyName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formAgencyAddress">
                            <Form.Label>Agency Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="agencyAddress"
                                placeholder="Enter agency address"
                                value={formData.agencyAddress}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formImei">
                            <Form.Label>IMEI</Form.Label>
                            <Form.Control
                                type="text"
                                name="imei"
                                placeholder="Enter IMEI number"
                                value={formData.imei}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formMac">
                            <Form.Label>MAC Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="mac"
                                placeholder="Enter MAC address"
                                value={formData.mac}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                placeholder="Enter your state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formPanImage">
                            <Form.Label>PAN Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="panImage"
                                onChange={handleFileChange}
                                required
                            />
                            <FaUpload className="text-primary" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formAadharFront">
                            <Form.Label>Aadhar Front</Form.Label>
                            <Form.Control
                                type="file"
                                name="aadharFront"
                                onChange={handleFileChange}
                                required
                            />
                            <FaUpload className="text-primary" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formShopProof">
                            <Form.Label>Shop Proof</Form.Label>
                            <Form.Control
                                type="file"
                                name="shopProof"
                                onChange={handleFileChange}
                                required
                            />
                            <FaUpload className="text-primary" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formSelfPhoto">
                            <Form.Label>Self Photo</Form.Label>
                            <Form.Control
                                type="file"
                                name="selfPhoto"
                                onChange={handleFileChange}
                                required
                            />
                            <FaUpload className="text-primary" />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default OnboardUser;
