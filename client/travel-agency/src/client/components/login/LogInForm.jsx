import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      const { userType } = response.data;
      localStorage.setItem('userType', userType);
      navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    toast.info('Google login not implemented yet.');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h4 className="text-center mb-4">Welcome Back!</h4>
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
                    placeholder="Enter email or mobile number"
                    required
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
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
                </div>
                <Button type="submit" className="w-100 mb-3" style={{background:"#8c3eea", borderColor:"#8c3eea"}}>
                  Log in
                </Button>
                <Button variant="outline-secondary" className="w-100" onClick={handleGoogleLogin}>
                  <FaGoogle className="me-2" />
                  Login with Google
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Register now</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;