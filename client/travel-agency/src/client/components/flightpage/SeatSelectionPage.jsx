import React, { useEffect, useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import usePayment from '../../../utils/payment';
import { updatePassenger } from '../../../redux/flightSlice';
import { toast } from 'react-toastify';
import SeatSelection from './SeatSelection';
import axios from 'axios';

const SeatSelectionPage = () => {
    const [customerInfo, setCustomerInfo] = useState({
        mobile: '',
        email: '',
    });

    const serviceType = "bookflight";
    const dispatch = useDispatch();
    const { payment } = usePayment();
    const flightDetails = useSelector((state) => state.flights.flightDetails);
    const passengers = useSelector((state) => state.flights.passengers);
    const segments = useSelector((state) => state.flights.segments);
    const fare = useSelector((state) => state.flights.fare);
    const location = useLocation();
    const navigate = useNavigate();

    const { seatData, totalPrice, flightKey, searchKey, fareId } = location.state;

    // Handle seat selection for each passenger
    const handleSeatSelect = (passengerFirstName, seat) => {
        const passengerIndex = passengers.findIndex(passenger => passenger.First_Name === passengerFirstName);
        if (passengerIndex !== -1) {
            dispatch(updatePassenger({
                index: passengerIndex,
                data: {
                    SSR_Key: seat.SSR_Key,
                    seat: seat.SSR_TypeName
                }
            }));
        }
    };

    const [convenienceFeePerct, setConvenienceFeePerct] = useState(0);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const { data } = await axios.get('/api/services/Flight');
                setConvenienceFeePerct(data.charge);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, []);

    // Calculate the total price based on selected seats
    const calculateTotalPrice = () => {
        let totalPrice = passengers.reduce((acc, passenger) => {
            return acc + (passenger.price ? passenger.price : 0) + (passenger.seatPrice ? passenger.seatPrice : 0);
        }, 0);

        return totalPrice;
    };

    const calculateTotalPriceWithFee = (totalPrice) => {
        const convenienceFee = (convenienceFeePerct / 100) * totalPrice;
        return totalPrice + convenienceFee;
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
            segments,
            fare,
            passengers,
            flightKey,
            searchKey,
            fareId,
            mobile: customerInfo.mobile,
            email: customerInfo.email,
            totalPrice: total
        };

        // Validation for flightDetails
        const isFlightDetailsValid = bookingData.flightDetails &&
            bookingData.flightDetails.Origin?.AIRPORTCODE &&
            bookingData.flightDetails.Origin?.COUNTRYCODE &&
            bookingData.flightDetails.Destination?.AIRPORTCODE &&
            bookingData.flightDetails.Destination?.COUNTRYCODE &&
            bookingData.flightDetails.TravelDate;

        // Determine if international travel type
        const isTravelTypeInternational = bookingData.flightDetails?.Travel_Type === "1";
        // Validation for passengers
        const isPassengerValid = bookingData.passengers && bookingData.passengers.every(passenger =>
            passenger.Pax_type !== undefined &&
            passenger.First_Name &&
            passenger.Last_Name &&
            passenger.Gender !== undefined &&
            passenger.DOB &&
            passenger.Nationality &&
            passenger.SSR_Key &&
            passenger.seat &&
            passenger.Title &&
            // Conditional passport validation for international flights
            (!isTravelTypeInternational || (
                passenger.Passport_Number &&
                passenger.Passport_Issuing_Country &&
                passenger.Passport_Expiry
            ))
        );
        // Validate all required fields
        if (!isFlightDetailsValid || !isPassengerValid ||
            !bookingData.flightKey || !bookingData.searchKey || !bookingData.fareId ||
            !bookingData.mobile || !bookingData.email || bookingData.totalPrice <= 0) {
            toast.error('Error: Missing or invalid booking details. Try again.');
            return;
        }

        try {
            const receipt = `flight_booking_rcptid_${Math.floor(Math.random() * 10000)}`;
            const serviceDetails = bookingData;
            payment(total, receipt, serviceType, serviceDetails);
        } catch (error) {
            console.error('Error booking:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-4 mb-5">
            <SeatSelection
                seatData={seatData}
                passengers={passengers}
                onSeatSelect={handleSeatSelect}
                onBack={() => navigate(-1)}
            />

            <div className='d-flex gap-1'>
                <h5>Total Price: INR {calculateTotalPriceWithFee(calculateTotalPrice())}</h5>
                <Badge bg="secondary">Convenience Fee: INR {((convenienceFeePerct / 100) * calculateTotalPrice()).toFixed(2)}</Badge>
            </div>
            <div className="row gap-2 mt-2">
                <div className="col-lg-3 col-md-12">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="mobile"
                            value={customerInfo.mobile}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                        />
                    </Form.Group>
                </div>
                <div className="col-lg-3 col-md-12">
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
            </div>

            <Button variant="primary" className="mt-3" onClick={handleConfirm}>
                Book
            </Button>
        </div>
    );
};

export default SeatSelectionPage;