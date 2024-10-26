import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container, Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ArrowLeft, Info } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePassenger } from '../../../redux/flightSlice';

const SeatSelection = ({ passengers, seatData, onBack }) => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedPassengerCount, setSelectedPassengerCount] = useState(passengers[0]?.passengerCount || 0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSeatSelection = (passengerCount, seat) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [passengerCount]: seat,
    }));

    const updatedPassengerIndex = passengers.findIndex(p => p.passengerCount === passengerCount);

    if (updatedPassengerIndex !== -1) {
      const updatedPassenger = {
        ...passengers[updatedPassengerIndex],
        SSR_Key: seat.SSR_Key,
        seatPrice: seat.Total_Amount,
      };

      dispatch(updatePassenger({
        index: updatedPassengerIndex,
        data: updatedPassenger
      }));
    } else {
      console.error(`Passenger with count ${passengerCount} not found.`);
    }
  };

  const getSeatColor = (seat, passenger) => {
    if (Object.values(selectedSeats).some((s) => s.SSR_Key === seat.SSR_Key)) return 'success';
    if (!seat.ApplicablePaxTypes.includes(Number(passenger.Pax_type))) return 'light';
    switch (seat.SSR_Status) {
      case 0: return 'secondary';
      case 1: return 'primary';
      case 2: return 'warning';
      case 3: return 'danger';
      default: return 'light';
    }
  };

  const renderSeat = (seat, passenger) => {
    const seatColor = getSeatColor(seat, passenger);
    const isApplicable = seat.ApplicablePaxTypes.includes(Number(passenger.Pax_type));

    return (
      <OverlayTrigger
        key={seat.SSR_Key}
        placement="top"
        overlay={
          <Tooltip id={`tooltip-${seat.SSR_Key}`}>
            {seat.SSR_TypeDesc}<br />
            {seat.Currency_Code} {seat.Total_Amount}<br />
          </Tooltip>
        }
      >
        <Button
          className="m-1"
          style={{ width: '40px', height: '40px', padding: 0 }}
          variant={seatColor}
          disabled={!isApplicable || seat.SSR_Status !== 1}
          onClick={() => handleSeatSelection(passenger.passengerCount, seat)}
        >
          {seat.SSR_TypeName}
        </Button>
      </OverlayTrigger>
    );
  };

  const renderSeatMap = (currentPassenger) => {
    if (Array.isArray(seatData) && seatData.length > 0) {
      const rows = {};

      seatData.forEach((block) => {
        block.Seat_Details.forEach((seat) => {
          if (seat.SSR_TypeName && typeof seat.SSR_TypeName === 'string') {
            const row = seat.SSR_TypeName.slice(0, -1);
            const column = seat.SSR_TypeName.slice(-1);

            if (!rows[row]) {
              rows[row] = {};
            }
            rows[row][column] = seat;
          }
        });
      });

      const rowKeys = Object.keys(rows).sort((a, b) => a - b);
      const columns = Array.from(
        new Set(
          seatData.flatMap((block) =>
            block.Seat_Details
              .filter((seat) => seat.SSR_TypeName && typeof seat.SSR_TypeName === 'string')
              .map((seat) => seat.SSR_TypeName.slice(-1))
          )
        )
      ).sort();

      return (
        <Container fluid>
          <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns.length + 1}, auto)`,
                gridAutoRows: 'auto',
                gap: '10px',
              }}
            >
              {rowKeys.map((rowKey) => (
                <React.Fragment key={rowKey}>
                  <div
                    className="d-flex align-items-center justify-content-end"
                    style={{ gridColumn: '1', marginRight: '10px' }}
                  >
                    <strong>{rowKey}</strong>
                  </div>
                  {columns.map((column) => (
                    <div key={column} style={{ gridColumn: 'auto' }}>
                      {rows[rowKey][column]
                        ? renderSeat(rows[rowKey][column], currentPassenger)
                        : <div style={{ width: '40px', height: '40px' }} />}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      );
    }

    return null;
  };

  const handlePassengerChange = (e) => {
    setSelectedPassengerCount(Number(e.target.value));
  };

  const currentPassenger = passengers.find(p => p.passengerCount === selectedPassengerCount);

  return (
    <Container fluid className="p-4">
      <Button className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <Row>
        <Col md={6}>
          <h4>Passenger Information</h4>
          <Form.Group>
            <Form.Label>Select Passenger:</Form.Label>
            <Form.Control as="select" value={selectedPassengerCount} onChange={handlePassengerChange}>
              {passengers.map((passenger) => (
                <option key={passenger.passengerCount} value={passenger.passengerCount}>
                  {passenger.First_Name} {passenger.Last_Name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {currentPassenger && (
            <Card key={currentPassenger.passengerCount} className="mb-4">
              <Card.Body>
                <Card.Title>{`${currentPassenger.First_Name} ${currentPassenger.Last_Name}`}</Card.Title>
                <Form.Group>
                  <Form.Label>Selected Seat:</Form.Label>
                  <Form.Control
                    readOnly
                    value={selectedSeats[currentPassenger.passengerCount] ? `${selectedSeats[currentPassenger.passengerCount].SSR_TypeName} - ${selectedSeats[currentPassenger.passengerCount].SSR_TypeDesc}` : 'Not selected'}
                  />
                </Form.Group>
                {selectedSeats[currentPassenger.passengerCount] && (
                  <div className="mt-2">
                    <p>Price: {selectedSeats[currentPassenger.passengerCount].Currency_Code} {selectedSeats[currentPassenger.passengerCount].Total_Amount}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          {currentPassenger && renderSeatMap(currentPassenger)}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="d-flex flex-wrap">
            <Badge bg="primary" className="m-1 p-2">Available</Badge>
            <Badge bg="warning" className="m-1 p-2">Blocked</Badge>
            <Badge bg="danger" className="m-1 p-2">Booked</Badge>
            <Badge bg="success" className="m-1 p-2">Selected</Badge>
            <Badge bg="secondary" className="m-1 p-2">Isle</Badge>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatSelection;