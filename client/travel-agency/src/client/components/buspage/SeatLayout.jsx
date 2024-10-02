import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
    const [showContactForm, setShowContactForm] = useState(false);
    const [passengers, setPassengers] = useState([]);
    const [currentPassenger, setCurrentPassenger] = useState({
        passengertitle: '',
        passengername: '',
        passengerage: '',
        seat: null,
    });
    const [showPassengerForm, setShowPassengerForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const id = bus.id;

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

    const handleAddPassenger = () => {
        if (currentPassenger.passengertitle && currentPassenger.passengername && currentPassenger.passengerage && currentPassenger.seat) {
            const updatedPassengers = editingIndex !== null
                ? passengers.map((passenger, index) => index === editingIndex ? currentPassenger : passenger)
                : [...passengers, currentPassenger];

            setPassengers(updatedPassengers);
            setCurrentPassenger({ passengertitle: '', passengername: '', passengerage: '', seat: null });
            setSeatData((prevSeatData) =>
                prevSeatData.map((seat) =>
                    seat.Seat_Key === currentPassenger.seat.Seat_Key ? { ...seat, available: "False" } : seat
                )
            );
            setEditingIndex(null);
        }
    };

    const handleEditPassenger = (index) => {
        setCurrentPassenger(passengers[index]);
        setEditingIndex(index);
    };

    const handleRemovePassenger = (index) => {
        const removedPassenger = passengers[index];
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);
        setSeatData((prevSeatData) =>
            prevSeatData.map((seat) =>
                seat.Seat_Key === removedPassenger.seat.Seat_Key ? { ...seat, available: "True" } : seat
            )
        );
    };

    const { source, destination, journeyDate } = useSelector((state) => state.bus);

    const handleBook = () => {
        const bookingData = {
            source,
            destination,
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
        console.log(bookingData);
        // Add API call to handle booking
    };

    const availableSeats = seatData.filter((seat) => seat.available === "True");

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
                                        className={`col-sm-4 col-md-2 mb-2 ${seat.available === "True" ? 'border border-success' : 'border border-danger'} p-2 rounded text-center`}
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            margin: '0 auto',
                                            opacity: seat.available === "True" ? 1 : 0.5,
                                        }}
                                    >
                                        <strong>Seat {seat.name}</strong>
                                        <p>₹{seat.fare}</p>
                                        <p>{seat.available === "True" ? "Available" : "Booked"}</p>
                                    </div>
                                ))}
                            </div>

                            {!showContactForm && (
                                <button className="btn btn-primary mt-3" onClick={() => setShowContactForm(true)}>
                                    Book
                                </button>
                            )}

                            {showContactForm && (
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
                                    <button className="btn btn-primary mt-2" onClick={() => setShowPassengerForm(true)}>Next</button>
                                </div>
                            )}

                            {showPassengerForm && (
                                <div className="mt-4">
                                    <h5>Passenger Details</h5>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="passengertitle"
                                                className="form-control"
                                                placeholder="Title"
                                                value={currentPassenger.passengertitle}
                                                onChange={handlePassengerInput}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="passengername"
                                                className="form-control"
                                                placeholder='Name'
                                                value={currentPassenger.passengername}
                                                onChange={handlePassengerInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                name="passengerage"
                                                className="form-control"
                                                placeholder='Age'
                                                value={currentPassenger.passengerage}
                                                onChange={handlePassengerInput}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <select
                                                name="Seat_Key"
                                                className="form-control"
                                                value={currentPassenger.seat ? currentPassenger.seat.name : ''}
                                                onChange={(e) => {
                                                    const selectedSeat = availableSeats.find(seat => seat.name === e.target.value);
                                                    setCurrentPassenger((prev) => ({
                                                        ...prev,
                                                        seat: selectedSeat,
                                                    }));
                                                }}
                                            >
                                                <option value="">Select a seat</option>
                                                {availableSeats.map((seat) => (
                                                    <option key={seat.name} value={seat.name}>
                                                        {seat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={handleAddPassenger}>
                                        {editingIndex !== null ? 'Update Passenger' : 'Add Passenger'}
                                    </button>
                                </div>
                            )}

                            {passengers.length > 0 && (
                                <div>
                                    <h5 className="mt-4">Passengers:</h5>
                                    <ul className="list-group">
                                        {passengers.map((passenger, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {`${passenger.passengertitle} ${passenger.passengername}, Age: ${passenger.passengerage}, Seat: ${passenger.seat.name}`}
                                                <div>
                                                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditPassenger(index)}>Edit</button>
                                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRemovePassenger(index)}>Remove</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
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
