import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';

const IRCTCPage = ({ clientId }) => {
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await axios.get('/api/irctc/get-irctc');
        setLink(response.data.link);
      } catch (err) {
        setError('Failed to fetch the IRCTC link');
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [clientId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
      <Row>
        <Col>
          {link ? (
            <iframe
              src={link}
              title="IRCTC Login"
              style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
              allowFullScreen
            ></iframe>
          ) : (
            <Alert variant="warning">Service not available</Alert>
          )}
        </Col>
      </Row>
  );
};

export default IRCTCPage;
