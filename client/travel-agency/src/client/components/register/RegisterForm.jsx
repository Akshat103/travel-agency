import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUser, FaMobile, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile number validation: exactly 10 digits
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    // Email validation: basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('/api/register', formData);
      toast.success('Successful! You can login now');

      setFormData({
        name: '',
        mobileNumber: '',
        email: '',
        password: ''
      });

      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
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

          </Col>

          <Col md={6}>
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
    </>
  );
};

export default RegisterForm;