import React from 'react';
import LogInForm from '../components/login/LogInForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img from '../../assets/img/yara.png';
import '../components/login/login.css';

const LogIn = () => {
  return (
    <>
      {/* Floating balls */}
      <div className="ball-effect">
        <div className="ball b1"></div>
        <div className="ball b2"></div>
        <div className="ball b3"></div>
        <div className="ball b4"></div>
        <div className="ball b5"></div>
      </div>
      <Container fluid className="py-5">
        <Row className="justify-content-center align-items-center">
          <Col lg={8} xxl={7} className="px-lg-5">
            <Card className="overflow-hidden border-0 shadow-lg">
              <Row className="g-0">
                {/* Left side image - only visible on lg screens and up */}
                <Col lg={6} className="d-none d-lg-block login-image-container">
                  <div className="login-image" style={{ position: 'relative', height: '100%' }}>
                    <div
                      className="overlay" // Ensure this overlay doesn't block the image
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1, // Make sure the overlay is on top of the image
                      }}
                    ></div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                      }}
                    ></div>
                  </div>
                </Col>

                {/* Login form */}
                <Col lg={6}>
                  <Card.Body className="p-4 p-lg-5">
                    <LogInForm />
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
