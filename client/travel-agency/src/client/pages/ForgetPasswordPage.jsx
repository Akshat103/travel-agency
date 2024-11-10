import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle email submit
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('/api/generate-otp', { email });
            if (response.status === 200) {
                setStep(2); // Go to OTP form
            }
        } catch (err) {
            setError('Failed to send OTP. Please check your email and try again.');
        }
    };

    // Handle OTP and password reset submit
    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('/api/change-password', { email, otp, newPassword });
            if (response.status === 200) {
                setSuccessMessage('Password changed successfully! You can now log in.');
                setEmail('');
                setOtp('');
                setNewPassword('');
                setStep(1); // Reset back to the email step
            }
        } catch (err) {
            setError('Invalid OTP or OTP expired. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h3 className="text-center mb-4">Reset Password</h3>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}

                            {step === 1 && (
                                <Form onSubmit={handleEmailSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" block className='mt-2'>
                                        Send OTP
                                    </Button>
                                    <p className="text-center mb-0">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-decoration-none">
                                            LogIn now
                                        </Link>
                                    </p>
                                </Form>
                            )}

                            {step === 2 && (
                                <Form onSubmit={handlePasswordResetSubmit}>
                                    <Form.Group controlId="otp">
                                        <Form.Label>OTP</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="newPassword" className="mt-3">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" block className="mt-4">
                                        Reset Password
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgetPasswordPage;
