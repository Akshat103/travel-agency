import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowLeft, Plane, Clock, DollarSign } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
  updateFare,
  updateSegments,
} from '../../../redux/flightSlice';

const FlightDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const bookFare = (fare, flightKey, segments, price) => {
    dispatch(updateFare(fare));
    dispatch(updateSegments(segments));
    navigate('/flight/add-passengers', {
      state: { fareId: fare.Fare_Id, flightKey, reprice: flight.Repriced, price }
    });
  };

  const location = useLocation();
  const { flight } = location.state || {};

  if (!flight) {
    return <div>Flight not found</div>;
  }

  return (
    <Container className="mt-4">
      <Button
        variant="outline-primary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="me-2" size={18} /> Back to Flights
      </Button>

      <Card className="mb-4">
        <Card.Header>
          <Card.Title as="h4">Flight Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Plane className="me-2" size={18} />
              <span className="fw-bold">
                {flight.Origin} to {flight.Destination}
              </span>
            </Col>
            <Col md={6}>
              <Clock className="me-2" size={18} />
              <span>{flight.TravelDate}</span>
            </Col>
          </Row>

          {flight.Segments.map((segment, index) => {
            return (
              <Row key={index} className="mt-3">
                <Col>
                  <p className="fw-bold">{segment.Airline_Name} - Flight {segment.Flight_Number}</p>
                  <p>{segment.Origin_City} ({segment.Origin}) → {segment.Destination_City} ({segment.Destination})</p>
                  <p>Departure: {segment.Departure_DateTime}</p>
                  <p>Arrival: {segment.Arrival_DateTime}</p>
                  <p>Duration: {segment.Duration}</p>
                </Col>
              </Row>
            );
          })}
        </Card.Body>
      </Card>

      <h4 className="mb-3">Fare Options</h4>
      <Row>
        {flight.Fares.map((fare, idx) => (
          <Col key={idx} md={6} lg={4} className="mb-3">
            <Card>
              <Card.Header>
                <Card.Title>{fare.ProductClass}</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className="mb-2">
                  <span className="fw-bold">{Math.ceil(fare.Seats_Available)}</span> Seats Available
                </p>
                <p className="mb-3">
                  <DollarSign className="me-1" size={18} />
                  <span className="fw-bold">
                    {Math.ceil(fare.FareDetails[0].Total_Amount)} {fare.FareDetails[0].Currency_Code}
                  </span>
                </p>
                <Button
                  variant="primary"
                  onClick={() => bookFare(
                    fare,
                    flight.Flight_Key,
                    flight.Segments,
                    Math.ceil(fare.FareDetails[0].Total_Amount)
                  )}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FlightDetails;
