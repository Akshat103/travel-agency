import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData, {
        withCredentials: true
      });
      
      const { userType, irctc } = response.data;
      localStorage.setItem('userType', userType);
      localStorage.setItem('irctc', irctc);
      
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Welcome Back!</h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaEnvelope className="me-2" />
                    Email or Mobile
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="emailOrMobile"
                    value={formData.emailOrMobile}
                    onChange={handleChange}
                    required
                    placeholder="Enter email or mobile"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                </Form.Group>

                <div className="text-end mb-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Log in
                </Button>

                <Button
                  variant="outline-primary"
                  type="button"
                  className="w-100 mb-3"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle className="me-2" />
                  Continue with Google
                </Button>

                <p className="text-center mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Register now
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;