import React, { Suspense, lazy } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import img from '../../assets/img/abstract-travel.jpg';
import train from '../../assets/img/services/train.jpg';
import flight from '../../assets/img/services/flight.jpg';
import hotel from '../../assets/img/services/hotel.jpg';
import mobile from '../../assets/img/services/mobile.jpg';
import bus from '../../assets/img/services/bus.jpg';
import ClientFooter from '../components/ClientFooter'
import '../../assets/css/AboutUs.css';

const services = [
    { title: 'Flight Booking', desc: 'Search and book domestic and international flights with ease.', img: flight },
    { title: 'Mobile Recharge', desc: 'Quick mobile recharge services for all major operators.', img: mobile },
    { title: 'Hotel Reservations', desc: 'Find and book the best hotels at competitive prices.', img: hotel },
    { title: 'Bus Tickets', desc: 'Travel hassle-free by booking bus tickets online.', img: bus },
    { title: 'Train Tickets', desc: 'Plan your rail journeys with ease using our train ticket booking feature.', img: train }
];

const ServiceCard = ({ service }) => (
    <Card className="about-service-card h-100 shadow-sm border-0">
        <Card.Img variant="top" src={service.img} alt={service.title} loading="lazy" className="about-service-img" />
        <Card.Body className="text-center">
            <Card.Title className="about-service-title">{service.title}</Card.Title>
            <Card.Text className="about-service-desc">{service.desc}</Card.Text>
        </Card.Body>
    </Card>
);

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" as="style" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
            </Helmet>
            <Container fluid className="p-0 about-container">
                <div className="about-header-section">
                    <div className="about-header-content">
                        <h1 className="display-4 fw-bold text-white about-header-title">About Yara Holidays</h1>
                        <p className="lead fw-normal text-white about-header-desc">Discover the world with us, one journey at a time.</p>
                    </div>
                </div>

                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col lg={6} className="order-lg-2">
                            <img src={img} alt="Abstract Travel" className="img-fluid rounded shadow-lg mb-4 about-main-img" loading="lazy" />
                        </Col>
                        <Col lg={6} className="order-lg-1">
                            <h2 className="display-5 fw-bold mb-4">Welcome to Yara Holidays</h2>
                            <p className="lead">At Yara Holidays, we are committed to offering you the best travel experiences. Whether it's booking flights, hotels, buses, or trains, we provide an all-in-one platform to plan your journeys.</p>
                            <p>With years of experience in the travel industry, Yara Holidays ensures a seamless booking process and excellent customer service. Our mission is to make travel easy, affordable, and convenient for everyone.</p>
                        </Col>
                    </Row>
                </Container>

                <Container className="py-5 about-services-section">
                    <h2 className="text-center mb-5">Our Services</h2>
                    <Row>
                        <Suspense fallback={<div>Loading services...</div>}>
                            {services.map((service, index) => (
                                <Col md={4} key={index} className="mb-4">
                                    <ServiceCard service={service} />
                                </Col>
                            ))}
                        </Suspense>
                    </Row>
                </Container>

                <Container fluid className="about-footer-section text-center text-white">
                    <h2 className="display-5 fw-bold mb-4">Start Your Journey Today</h2>
                    <p className="lead text-white">Experience the world with Yara Holidays - Your trusted travel companion.</p>
                </Container>
            </Container>
            <ClientFooter />
        </>
    );
};

export default AboutUs;
