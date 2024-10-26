import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaBug } from "react-icons/fa";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error}
        resetError={() => this.setState({ hasError: false })}
      />;
    }

    return this.props.children;
  }
}

// Separate functional component for the error UI
const ErrorFallback = ({ error, resetError }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    resetError();
    navigate('/');
  };

  const handleRefresh = () => {
    resetError();
    window.location.reload();
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaBug className="text-danger" size={50} />
              </div>
              
              <Card.Title className="text-center mb-4">
                <h2 className="text-danger fw-bold">Oops! Something Went Wrong</h2>
              </Card.Title>

              <Card.Text className="text-center text-muted mb-4">
                We apologize for the inconvenience. An unexpected error has occurred.
              </Card.Text>

              {error && (
                <Card.Text className="bg-light p-3 rounded text-muted small mb-4">
                  <code>{error.toString()}</code>
                </Card.Text>
              )}

              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  onClick={handleHomeClick}
                >
                  <FaHouse size={20} />
                  Go to Home
                </Button>
                
                <Button
                  variant="outline-secondary"
                  className="d-flex align-items-center gap-2"
                  onClick={handleRefresh}
                >
                  <BsArrowCounterclockwise size={20} />
                  Try Again
                </Button>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mt-4 text-muted">
            <small>If the problem persists, please contact support</small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorBoundaryClass;