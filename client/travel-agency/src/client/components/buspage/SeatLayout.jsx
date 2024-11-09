import React, { useState, useEffect } from 'react';
import usePayment from '../../../utils/payment';
import { useSelector } from 'react-redux';
import { IoIosPersonAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoPersonRemove } from "react-icons/io5";
import { Container, Row, Col, Button, Form, ListGroup, Tooltip, OverlayTrigger, Card, Badge } from 'react-bootstrap';
import axios from 'axios';

const SeatLayout = ({ bus, selectedBoarding, selectedDropping }) => {
    const [seatData, setSeatData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contactDetails, setContactDetails] = useState({
        mobile: '',
        email: '',
        idType: '',
        idNumber: '',
        address: ''
    });
    const [passengers, setPassengers] = useState([]);
    const [currentPassenger, setCurrentPassenger] = useState({
        passengertitle: '',
        passengername: '',
        passengerage: '',
        seat: null,
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [showPassengerInputs, setShowPassengerInputs] = useState(false);
    const { payment } = usePayment();
    const id = bus.id;

    useEffect(() => {
        fetchSeatData();
    }, []);

    useEffect(() => {
        updateAvailableSeats();
    }, [seatData, passengers]);

    const [convenienceFeePerct, setConvenienceFeePerct] = useState(0);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const { data } = await axios.get('/api/services/Bus');
                setConvenienceFeePerct(data.charge);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, []);

    const updateAvailableSeats = () => {
        const available = seatData.filter(seat =>
            seat.available === "True" &&
            !passengers.some(p => p.seat && p.seat.name === seat.name)
        );
        setAvailableSeats(available);
    };

    const fetchSeatData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/seatLayout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch seat data');
            }
            const data = await response.json();
            const sortedData = data.sort((a, b) => (a.row - b.row || a.column - b.column));
            setSeatData(sortedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleContactInput = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePassengerInput = (e) => {
        const { name, value } = e.target;
        setCurrentPassenger((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSeatSelection = (selectedSeat) => {
        setCurrentPassenger((prev) => ({
            ...prev,
            seat: selectedSeat,
        }));
    };

    const handleAddPassenger = () => {
        if (currentPassenger.passengertitle && currentPassenger.passengername && currentPassenger.passengerage && currentPassenger.seat) {
            const updatedPassengers = editingIndex !== null
                ? passengers.map((passenger, index) => index === editingIndex ? currentPassenger : passenger)
                : [...passengers, currentPassenger];

            setPassengers(updatedPassengers);
            setCurrentPassenger({ passengertitle: '', passengername: '', passengerage: '', seat: null });

            const total = updatedPassengers.reduce((sum, passenger) => sum + (passenger.seat ? Number(passenger.seat.fare) : 0), 0);
            setTotalAmount(total);

            setEditingIndex(null);
            setShowPassengerInputs(false);
            updateAvailableSeats();
        }
    };

    const handleRemovePassenger = (index) => {
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);

        const total = updatedPassengers.reduce((sum, passenger) => sum + (passenger.seat ? Number(passenger.seat.fare) : 0), 0);
        setTotalAmount(total);
        updateAvailableSeats();
    };

    const handleEditPassenger = (index) => {
        const passengerToEdit = passengers[index];
        setCurrentPassenger(passengerToEdit);
        setEditingIndex(index);
        setShowPassengerInputs(true);
    };

    const { source, sourceName, destination, destinationName, journeyDate } = useSelector((state) => state.bus);

    const handleBook = async () => {
        const bookingData = {
            source,
            sourceName,
            destination,
            destinationName,
            doj: journeyDate,
            tripid: bus.id,
            bpid: selectedBoarding,
            dpid: selectedDropping,
            mobile: contactDetails.mobile,
            email: contactDetails.email,
            idtype: contactDetails.idType,
            idnumber: contactDetails.idNumber,
            address: contactDetails.address,
            Search_Key: bus.Search_Key,
            seats: passengers.map(({ passengertitle, passengername, passengerage, seat }) => ({
                seatname: seat.name,
                Seat_Key: seat.Seat_Key,
                passengertitle,
                passengername,
                passengerage,
            })),
        };

        try {
            const receipt = `bus_booking_rcptid_${Math.floor(Math.random() * 10000)}`;
            const serviceType = "bookbus";
            const serviceDetails = bookingData;
            payment(Math.ceil(totalAmount), receipt, serviceType, serviceDetails)
        } catch (error) {
            console.error('Error booking:', error.response ? error.response.data : error.message);
        }
    };

    const getSeatColor = (seat) => {
        if (seat.available === "False") {
            return "#A9A9A9";
        } else if (seat.ladiesSeat === "True") {
            return "#FF69B4";
        } else if (seat.malesSeat === "True") {
            return "#1E90FF";
        } else {
            return "#32CD32";
        }
    };

    return (
        <Container>
            {loading && <p>Loading seat data...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <>
                    <div>
                        <Row className="mb-4 d-flex flex-column flex-md-row">
                            <Col md={6} className="mb-3 mb-md-0">
                                <Card style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                    <Card.Header>Lower Deck</Card.Header>
                                    <Card.Body>
                                        <Row className="g-2"> {/* Adds gap between seat columns */}
                                            {seatData.filter(seat => seat.zIndex === '0').map((seat) => (
                                                <Col key={`${seat.row}-${seat.column}`} xs={4} sm={3} md={3} className="mb-3">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Seat: {seat.name} <br />
                                                                Fare: ₹{Math.ceil(seat.fare)} <br />
                                                                {seat.ladiesSeat === "True" ? "Ladies Seat" : seat.malesSeat === "True" ? "Males Seat" : ""}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <div
                                                            className={`seat-container rounded text-center text-white'}`}
                                                            style={{
                                                                backgroundColor: getSeatColor(seat),
                                                                height: seat.length === '2' ? '100px' : '50px',
                                                                width: '50px',
                                                                margin: '5px'
                                                            }}
                                                            onClick={() => handleSeatSelection(seat)}
                                                        >
                                                            <strong>{seat.name}</strong>
                                                        </div>
                                                    </OverlayTrigger>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                    <Card.Header>Upper Deck</Card.Header>
                                    <Card.Body>
                                        <Row className="g-2"> {/* Adds gap between seat columns */}
                                            {seatData.filter(seat => seat.zIndex === '1').map((seat) => (
                                                <Col key={`${seat.row}-${seat.column}`} xs={4} sm={3} md={3} className="mb-3">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Seat: {seat.name} <br />
                                                                Fare: ₹{Math.ceil(seat.fare)} <br />
                                                                {seat.ladiesSeat === "True" ? "Ladies Seat" : seat.malesSeat === "True" ? "Males Seat" : ""}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <div
                                                            className={`seat-container rounded text-center text-white'}`}
                                                            style={{
                                                                backgroundColor: getSeatColor(seat),
                                                                height: seat.length === '2' ? '100px' : '50px',
                                                                width: '50px',
                                                                margin: '5px'
                                                            }}
                                                            onClick={() => handleSeatSelection(seat)}
                                                        >
                                                            <strong>{seat.name}</strong>
                                                        </div>
                                                    </OverlayTrigger>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    {/* Contact details form */}
                    <div className="mt-4">
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <input placeholder='Mobile Number' type="text" name="mobile" className="form-control" value={contactDetails.mobile} onChange={handleContactInput} />
                            </div>
                            <div className="col-md-6">
                                <input placeholder='Email' type="email" name="email" className="form-control" value={contactDetails.email} onChange={handleContactInput} />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <select name="idType" className="form-control" value={contactDetails.idType} onChange={handleContactInput}>
                                    <option value="">ID Proof</option>
                                    <option value="Aadhar">Aadhar</option>
                                    <option value="PAN">PAN</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="idNumber"
                                    className="form-control"
                                    placeholder='ID Number'
                                    value={contactDetails.idNumber}
                                    onChange={handleContactInput}
                                    maxLength={contactDetails.idType === 'Aadhar' ? 12 : 10}
                                    pattern={contactDetails.idType === 'Aadhar' ? '\\d{12}' : '[A-Z0-9]{10}'}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder='Address'
                                value={contactDetails.address}
                                onChange={handleContactInput}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="d-flex mb-3">
                            <h4 className="mx-4">Add Passenger:</h4>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setShowPassengerInputs(true);
                                    setCurrentPassenger({ passengertitle: '', passengername: '', passengerage: '', seat: null });
                                }}
                            >
                                {editingIndex !== null ? <CiEdit /> : <IoIosPersonAdd />}
                            </Button>
                        </div>
                        {showPassengerInputs && (
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Row className="mb-4">
                                            <Col md={4}>
                                                <Form.Control
                                                    type="text"
                                                    name="passengertitle"
                                                    placeholder="Title"
                                                    value={currentPassenger.passengertitle}
                                                    onChange={handlePassengerInput}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Form.Control
                                                    type="text"
                                                    name="passengername"
                                                    placeholder="Name"
                                                    value={currentPassenger.passengername}
                                                    onChange={handlePassengerInput}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Form.Control
                                                    type="number"
                                                    name="passengerage"
                                                    placeholder="Age"
                                                    value={currentPassenger.passengerage}
                                                    onChange={handlePassengerInput}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-4">
                                            <Col md={6}>
                                                <Form.Select
                                                    value={currentPassenger.seat ? currentPassenger.seat.name : ''}
                                                    onChange={(e) => {
                                                        const selectedSeat = availableSeats.find(seat => seat.name === e.target.value);
                                                        handleSeatSelection(selectedSeat);
                                                    }}
                                                >
                                                    <option value="">Select a seat</option>
                                                    {availableSeats.map((seat) => (
                                                        <option key={seat.name} value={seat.name}>
                                                            {seat.name} - ₹{Math.ceil(seat.fare)}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Button variant="primary" onClick={handleAddPassenger}>
                                            {editingIndex !== null ? 'Update Passenger' : 'Save Passenger'}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                    </div>

                    {passengers.length > 0 && (
                        <div>
                            <h5 className="mt-4 mb-3">Passengers:</h5>
                            <ListGroup className="mt-4">
                                {passengers.map((passenger, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {`${passenger.passengertitle} ${passenger.passengername} (${passenger.passengerage}), Seat: ${passenger.seat ? passenger.seat.name : 'Not selected'}`}
                                        <div>
                                            <Button variant="warning" size="sm" className="mx-1" onClick={() => handleEditPassenger(index)}>
                                                <CiEdit />
                                            </Button>
                                            <Button variant="danger" size="sm" className="mx-1" onClick={() => handleRemovePassenger(index)}>
                                                <IoPersonRemove />
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <div className='d-flex gap-2 m-1'>
                                <p>Total Amount: ₹{Math.ceil(totalAmount)}</p>
                                <Badge bg="secondary">Convenience Fee: {convenienceFeePerct}%</Badge>
                            </div>
                            <Button variant="success" className="mt-3" onClick={handleBook}>
                                Book Seats
                            </Button>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default SeatLayout;