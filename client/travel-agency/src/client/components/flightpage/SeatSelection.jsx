import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import usePayment from '../../../utils/payment';

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState({});
    const [filteredSeats, setFilteredSeats] = useState({});
    const [customerInfo, setCustomerInfo] = useState({
        mobile: '',
        email: '',
    });
    const { payment } = usePayment();
    const flightDetails = useSelector((state) => state.flights.flightDetails);

    const location = useLocation();
    const navigate = useNavigate();

    const { passengers, seatData, totalPrice, flightKey, searchKey, fareId } = location.state;

    useEffect(() => {
        const newFilteredSeats = {};
        passengers.forEach((passenger, index) => {
            newFilteredSeats[index] = seatData.filter(
                (seat) =>
                    seat.ApplicablePaxTypes.includes(Number(passenger.Pax_type))
            );
        });
        setFilteredSeats(newFilteredSeats);
    }, [passengers, seatData]);

    // Handle seat selection for each passenger
    const handleSeatSelection = (passengerIndex, seat) => {
        setSelectedSeats((prev) => ({
            ...prev,
            [passengerIndex]: {
                ...seat,
                SSR_Key: seat.SSR_Key
            }
        }));

        // Update the passengers array with the selected seat's SSR_Key
        setPassengers((prevPassengers) =>
            prevPassengers.map((passenger, index) =>
                index === passengerIndex
                    ? { ...passenger, SSR_Key: seat.SSR_Key }
                    : passenger
            )
        );
    };

    // Calculate the total price based on selected seats
    const calculateTotalPrice = () => {
        let seatPrice = Object.values(selectedSeats).reduce((acc, seat) => acc + seat.Total_Amount, 0);
        return totalPrice + seatPrice;
    };

    // Handle customer info input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Confirm seat selection
    const handleConfirm = async () => {
        const total = calculateTotalPrice();

        const bookingData = {
            flightDetails,
            passengers,
            flightKey,
            searchKey,
            fareId,
            mobile: customerInfo.mobile,
            email: customerInfo.email,
            totalPrice: total
        }
        try {
            const receipt = `flight_booking_rcptid_${Math.floor(Math.random() * 10000)}`;
            const serviceType = "bookflight";
            const serviceDetails = bookingData;
            payment(total, receipt, serviceType, serviceDetails)
        } catch (error) {
            console.error('Error booking:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-4">
            <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-3">
                Back
            </button>
            {passengers.map((passenger, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>{`${passenger.First_Name} ${passenger.Last_Name}`}</Card.Title>
                        <Form.Group>
                            <Form.Label>Select a seat:</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => handleSeatSelection(index, JSON.parse(e.target.value))}
                                value={selectedSeats[index] ? JSON.stringify(selectedSeats[index]) : ''}
                            >
                                <option value="">Choose a seat</option>
                                {filteredSeats[index]?.map((seat) => (
                                    <option key={seat.SSR_Key} value={JSON.stringify(seat)}>
                                        {seat.SSR_TypeDesc} - {seat.Currency_Code} {seat.Total_Amount}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Card>
            ))}

            <h5 className="mt-3">Total Price: INR {calculateTotalPrice()}</h5>
            <div className="row gap-2 mt-2">
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="mobile"
                        value={customerInfo.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                    />
                </Form.Group>
            </div>
            <Button variant="primary" className="mt-3" onClick={handleConfirm}>
                Book
            </Button>
        </div>
    );
};

export default SeatSelection;