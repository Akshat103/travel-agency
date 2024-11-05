import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ClientFooter from '../components/ClientFooter'
import contactImg from '../../assets/img/contact.jpg'

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
        <>
            <Container fluid className="p-0">
                <Row className="g-0">
                    <Col md={6} className="p-0">
                        <div
                            className="h-100 d-flex flex-column justify-content-center align-items-center text-black p-5 position-relative"
                            style={{
                                minHeight: '100vh',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Blurred background image */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${contactImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'blur(2px)',
                                    zIndex: -1,
                                    opacity: 0.5
                                }}
                            ></div>

                            {/* Content */}
                            <div style={{ zIndex: 1 }}>
                                <h2 className="mb-4 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Contact Yara Holidays</h2>
                                <p className="mb-3">
                                    <strong>Phone:</strong> +91 8079 881 580
                                </p>
                                <p className="mb-3">
                                    <strong>Email:</strong> info@yaraholidays.com
                                </p>
                                <p className="mb-3">
                                    <strong>Address:</strong> Yara Holidays, NO 14
                                    <p>Raja Rani Enclave near Gokuldham temple</p>
                                    <p>Gosaninuagaon Berhmapur Ganjam, 760003</p>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="p-0">
                        <div className="h-100 d-flex flex-column justify-content-center p-5 pt-0" style={{ minHeight: '100vh' }}>
                            <h3 className="mb-4 mt-4 text-center" style={{ color: '#282a29', fontSize: '2rem', fontWeight: 'bold' }}>Get in Touch</h3>
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
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message"
                                        required
                                        className="border-0 border-bottom rounded-0"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3 w-100" style={{
                                    background: '#282a29',
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
            <ClientFooter />
        </>
    );
};

export default ContactUs;