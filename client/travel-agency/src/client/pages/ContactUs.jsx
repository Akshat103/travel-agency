import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/mail/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({ name: '', email: '', message: '' });
                toast.success('Your message has been sent successfully!');
            } else {
                toast.error('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            toast.error('There was an error sending your message. Please try again.');
        }
    };

    return (
        <Container fluid className="p-0">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Row className="g-0">
                <Col md={6} className="p-0">
                    <div className="h-100 d-flex flex-column justify-content-center align-items-center text-white p-5" style={{
                        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/api/placeholder/800/600") center/cover no-repeat',
                        minHeight: '100vh'
                    }}>
                        <h2 className="mb-4 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Contact Yara Holidays</h2>
                        <p className="mb-3">
                            <strong>Phone:</strong> +91 8079 881 580
                        </p>
                        <p className="mb-3">
                            <strong>Email:</strong> yaraholiday46@gmail.com
                        </p>
                        <p className="mb-3">
                            <strong>Address:</strong> Yara Holidays, 123 Travel Lane, City, State, PIN 123456
                        </p>
                    </div>
                </Col>
                <Col md={6} className="p-0">
                    <div className="h-100 d-flex flex-column justify-content-center p-5 pt-0" style={{ minHeight: '100vh' }}>
                        <h3 className="mb-4 text-center" style={{ color: '#8c3eea', fontSize: '2rem', fontWeight: 'bold' }}>Get in Touch</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name" 
                                    required
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email" 
                                    required
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                            <Form.Group controlId="formMessage" className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={1} 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message" 
                                    required
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3 w-100" style={{
                                background: 'linear-gradient(90deg, #8c3eea, #d063f0)',
                                border: 'none',
                                padding: '10px 0',
                                fontSize: '1.1rem'
                            }}>
                                Send Message
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;