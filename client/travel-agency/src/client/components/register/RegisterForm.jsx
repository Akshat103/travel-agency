import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUser, FaMobile, FaEnvelope, FaVenusMars, FaBirthdayCake, FaMapMarkerAlt, FaLock, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
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

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? formatDate(date) : '';
    setFormData({ ...formData, dateOfBirth: formattedDate });
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
        userType: 1,
        mobileNumber: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        state: '',
        password: ''
      });

      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.error);
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
                    <Form.Group className="mb-3 row">
                      <Form.Label><FaBirthdayCake className="me-2" />Date of Birth*</Form.Label>
                      <div className="relative">
                        <style>
                          {`
                              .react-datepicker-wrapper {
                                display: block;
                              }
                              .react-datepicker-popper {
                                z-index: 9999 !important;
                              }
                              .react-datepicker-popper[data-placement^="bottom"] {
                                padding-top: 0;
                              }
                              .react-datepicker__month-container {
                                z-index: 9999 !important;
                              }
                          `}
                        </style>
                        <DatePicker
                          id="dateOfBirth"
                          name="dateOfBirth"
                          selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}  // Convert back to Date object for the DatePicker
                          onChange={handleDateChange}
                          dateFormat="MM/dd/yyyy"
                          placeholderText="MM/DD/YYYY"
                          showMonthDropdown
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={200}
                          maxDate={new Date()}
                          required
                          className="form-control"
                        />
                      </div>
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
    </Container >
  );
};

export default RegisterForm;