import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
            </Helmet>
            <Container fluid className="p-0">
                <div className="position-relative overflow-hidden p-3 p-md-5 text-center"
                     style={{
                         background: '#282a29',
                         minHeight: '300px'
                     }}>
                    <div className="col-md-8 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>About Yara Holidays</h1>
                        <p className="lead fw-normal text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Discover the world with us, one journey at a time.</p>
                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>

                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col lg={6} className="order-lg-2">
                            <img src="/api/placeholder/600/400" alt="Abstract Travel" className="img-fluid rounded shadow-lg mb-4" />
                        </Col>
                        <Col lg={6} className="order-lg-1">
                            <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome to Yara Holidays</h2>
                            <p className="lead" style={{ fontFamily: "'Poppins', sans-serif" }}>At Yara Holidays, we are committed to offering you the best travel experiences. Whether it's booking flights, hotels, buses, or trains, we provide an all-in-one platform to plan your journeys.</p>
                            <p style={{ fontFamily: "'Poppins', sans-serif" }}>With years of experience in the travel industry, Yara Holidays ensures a seamless booking process and excellent customer service. Our mission is to make travel easy, affordable, and convenient for everyone.</p>
                        </Col>
                    </Row>
                </Container>

                <Container className="py-5 bg-light">
                    <h2 className="text-center mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Our Services</h2>
                    <Row>
                        {[
                            { title: 'Flight Booking', desc: 'Search and book domestic and international flights with ease.', icon: '✈️' },
                            { title: 'Mobile Recharge', desc: 'Quick mobile recharge services for all major operators.', icon: '📱' },
                            { title: 'Hotel Reservations', desc: 'Find and book the best hotels at competitive prices.', icon: '🏨' },
                            { title: 'Bus Tickets', desc: 'Travel hassle-free by booking bus tickets online.', icon: '🚌' },
                            { title: 'Train Tickets', desc: 'Plan your rail journeys with ease using our train ticket booking feature.', icon: '🚆' }
                        ].map((service, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Body className="text-center">
                                        <div className="display-1 mb-3">{service.icon}</div>
                                        <Card.Title style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>{service.title}</Card.Title>
                                        <Card.Text style={{ fontFamily: "'Poppins', sans-serif" }}>{service.desc}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Container fluid className="p-5 text-center text-white" style={{background: '#282a29'}}>
                    <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Journey Today</h2>
                    <p className="lead text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Experience the world with Yara Holidays - Your trusted travel companion.</p>
                </Container>
            </Container>
        </>
    );
};

export default AboutUs;