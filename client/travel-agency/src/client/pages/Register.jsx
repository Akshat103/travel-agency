import React from 'react';
import RegisterForm from '../components/register/RegisterForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../components/register/register.css';

const Register = () => {
  return (
    <>
      {/* Animated background */}
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
                <Col lg={6} className="d-none d-lg-block register-image-container">
                  <div className="register-image">
                    <div className="overlay"></div>
                  </div>
                  <div className="image-content text-white p-4">
                    <h2 className="fw-bold mb-3">Join Us!</h2>
                    <p className="mb-0">Create an account to start using our services.</p>
                  </div>
                </Col>

                {/* Register form */}
                <Col lg={6}>
                  <Card.Body >
                    <RegisterForm />
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

export default Register;
