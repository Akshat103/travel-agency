import React from 'react';
import RegisterForm from '../components/register/RegisterForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img from '../../assets/img/yara.png';
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
        <Row className="justify-content-center align-items-stretch" style={{ height: '100vh' }}>
          <Col lg={8} xxl={7} className="px-lg-5">
            <Card className="overflow-hidden border-0 shadow-lg">
              <Row className="g-0">
                {/* Left side image - only visible on lg screens and up */}
                <Col lg={6} className="d-none d-lg-block register-image-container">
                  <div className="register-image" style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '100%',
                        width: '100%',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                      }}
                    ></div>
                  </div>
                </Col>

                {/* Register form */}
                <Col lg={6} className="d-flex align-items-center">
                  <Card.Body className="flex-grow-1 d-flex justify-content-center">
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
