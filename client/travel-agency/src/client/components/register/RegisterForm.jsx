import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUser, FaMobile, FaEnvelope, FaVenusMars, FaBirthdayCake, FaMapMarkerAlt, FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    userType: 1,
    mobileNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    state: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      await axios.post('/api/register', formData);
      toast.success('Successful! You can login now');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="py-5 justify-content-center">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h4 className="text-center mb-4">Register Account</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaUser className="me-2" />Full Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => setFormData(prev => ({
                          ...prev,
                          name: prev.name.replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        placeholder="Enter full name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><FaMobile className="me-2" />Mobile Number*</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><FaVenusMars className="me-2" />Gender*</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaBirthdayCake className="me-2" />Date of Birth*</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><FaMapMarkerAlt className="me-2" />State*</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={() => setFormData(prev => ({
                          ...prev,
                          state: prev.state.replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        placeholder="Enter state"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><FaLock className="me-2" />Password*</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>

                  </Col>

                </Row>
                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit" className="w-50 mb-3">
                    Register
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <p>Or register with:</p>
                  <div className="d-flex justify-content-center mb-3">
                    <Button variant="outline-secondary" className="mx-2">
                      <FaGoogle /> Google
                    </Button>
                  </div>
                  <p>Already have an account? <Link to="/login">Log in now</Link></p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;