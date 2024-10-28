import React from 'react';
import LogInForm from '../components/login/LogInForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
                  <div className="login-image">
                    <div className="overlay"></div>
                  </div>
                  <div className="image-content p-4">
                  <h3 className="fw-bold mb-3">Yara Holiday</h3>
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
