import React, { useState, useEffect } from 'react';
import usePayment from '../../../utils/payment';
import { useSelector } from 'react-redux';
import { IoIosPersonAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoPersonRemove } from "react-icons/io5";

const SeatLayout = ({ bus, selectedBoarding, selectedDropping }) => {
    const [showSeats, setShowSeats] = useState(false);
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
        updateAvailableSeats();
    }, [seatData, passengers]);

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
            const sortedData = data.sort((a, b) => (a.row === b.row ? a.column - b.column : a.row - b.row));
            setSeatData(sortedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowSeats = () => {
        if (!showSeats) {
            fetchSeatData();
        }
        setShowSeats(!showSeats);
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
            payment(totalAmount, receipt, serviceType, serviceDetails)
        } catch (error) {
            console.error('Error booking:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <button
                className="btn btn-outline-primary mb-3"
                onClick={handleShowSeats}
            >
                {showSeats ? 'Hide Seat Layout' : 'Show Seat Layout'}
            </button>

            {showSeats && (
                <div>
                    {loading && <p>Loading seat data...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && !error && (
                        <>
                            <div className="row overflow-auto" style={{ maxHeight: '200px' }}>
                                {seatData.map((seat) => (
                                    <div
                                        key={`${seat.row}-${seat.column}`}
                                        className={`col-sm-4 col-md-2 mb-2 ${availableSeats.some(s => s.Seat_Key === seat.Seat_Key) ? 'border border-success' : 'border border-danger'} p-2 rounded text-center`}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            margin: '0 auto',
                                            opacity: availableSeats.some(s => s.Seat_Key === seat.Seat_Key) ? 1 : 0.5,
                                        }}
                                    >
                                        <strong>Seat {seat.name}</strong>
                                        <p>₹{seat.fare}</p>
                                        <p>{availableSeats.some(s => s.Seat_Key === seat.Seat_Key) ? "Available" : "Booked"}</p>
                                    </div>
                                ))}
                            </div>

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

                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="mt-2 mb-2">Passengers:</h5>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-primary mb-3" onClick={() => {
                                        setShowPassengerInputs(true);
                                        setCurrentPassenger({ passengertitle: '', passengername: '', passengerage: '', seat: null });
                                    }}>
                                        {editingIndex !== null ? <CiEdit /> : <IoIosPersonAdd />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                {showPassengerInputs && (
                                    <>
                                        <div className="row mb-4">
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    name="passengertitle"
                                                    className="form-control"
                                                    placeholder="Title"
                                                    value={currentPassenger.passengertitle}
                                                    onChange={handlePassengerInput}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    name="passengername"
                                                    className="form-control"
                                                    placeholder='Name'
                                                    value={currentPassenger.passengername}
                                                    onChange={handlePassengerInput}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="number"
                                                    name="passengerage"
                                                    className="form-control"
                                                    placeholder='Age'
                                                    value={currentPassenger.passengerage}
                                                    onChange={handlePassengerInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <select
                                                    className="form-control"
                                                    value={currentPassenger.seat ? currentPassenger.seat.name : ''}
                                                    onChange={(e) => {
                                                        const selectedSeat = availableSeats.find(seat => seat.name === e.target.value);
                                                        handleSeatSelection(selectedSeat);
                                                    }}
                                                >
                                                    <option value="">Select a seat</option>
                                                    {availableSeats.map((seat) => (
                                                        <option key={seat.name} value={seat.name}>
                                                            {seat.name} - ₹{seat.fare}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary mb-2" onClick={handleAddPassenger}>
                                            {editingIndex !== null ? 'Update Passenger' : 'Save Passenger'}
                                        </button>
                                    </>
                                )}
                            </div>

                            {passengers.length > 0 && (
                                <div>
                                    <ul className="list-group">
                                        {passengers.map((passenger, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {`${passenger.passengertitle} ${passenger.passengername} ${passenger.passengerage}, Seat: ${passenger.seat ? passenger.seat.name : 'Not selected'}`}
                                                <div>
                                                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditPassenger(index)}><CiEdit /></button>
                                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRemovePassenger(index)}><IoPersonRemove /></button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3">Total Amount: ₹{totalAmount}</p>
                                    <button className="btn btn-success mt-3" onClick={handleBook}>Book Seats</button>
                                </div>
                            )}

                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SeatLayout;