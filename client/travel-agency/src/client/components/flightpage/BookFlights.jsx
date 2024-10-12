import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import countryList from '../../../assets/data/countries_name_flag.json';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

// BookFlights component
const BookFlights = () => {
    const location = useLocation();
    const { fareId, flightKey, reprice, price } = location.state || { fareId: null, flightKey: null, reprice: null, price: null };
    const searchKey = useSelector((state) => state.flights.searchKey);

    const navigate = useNavigate();
    const [passengers, setPassengers] = useState([
        {
            Pax_type: '',
            Title: '',
            First_Name: '',
            Last_Name: '',
            Gender: '',
            Age: '',
            DOB: null,
            Passport_Number: '',
            Passport_Issuing_Country: '',
            Passport_Expiry: null,
            Nationality: '',
            saved: false,
            SSR_Key:'',
            price: price || 0
        }
    ]);
    const [submitting, setSubmitting] = useState(false);

    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [name]: value };
        setPassengers(newPassengers);
    };

    const savePassenger = (index) => {
        const passenger = passengers[index];
        if (
            passenger.Pax_type &&
            passenger.Title &&
            passenger.First_Name &&
            passenger.Last_Name &&
            passenger.Gender &&
            passenger.DOB &&
            passenger.Passport_Number &&
            passenger.Passport_Issuing_Country &&
            passenger.Passport_Expiry &&
            passenger.Nationality
        ) {
            const newPassengers = [...passengers];
            newPassengers[index].saved = true;
            setPassengers(newPassengers);
        } else {
            toast.warn('Please fill in all fields before saving.');
        }
    };

    const calculateTotalPrice = () => {
        return passengers.reduce((total, passenger) => total + (passenger.price || 0), 0);
    };

    const addPassenger = () => {
        if (passengers.every((p) => p.saved)) {
            setPassengers([
                ...passengers,
                {
                    Pax_type: '',
                    Title: '',
                    First_Name: '',
                    Last_Name: '',
                    Gender: '',
                    Age: '',
                    DOB: null,
                    Passport_Number: '',
                    Passport_Issuing_Country: '',
                    Passport_Expiry: null,
                    Nationality: '',
                    saved: false,
                    price: price || 0
                }
            ]);
        } else {
            toast.warn('Please save all passengers before adding a new one.');
        }
    };

    const cancelAddingPassenger = () => {
        setPassengers(passengers.slice(0, -1));
    };

    const calculateAge = (dob) => {
        if (!dob) return '';
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const updateDOB = (index, date) => {
        const newPassengers = [...passengers];
        newPassengers[index].DOB = date;
        newPassengers[index].Age = calculateAge(date);
        setPassengers(newPassengers);
    };

    const deletePassenger = (index) => {
        const newPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(newPassengers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post('/api/getairseatmap', {
                passengers: passengers.map(({ saved, ...rest }) => rest),
                fareId,
                flightKey,
                searchKey,
                reprice
            });
            setSubmitting(false);

            // Navigate only after confirming seat data is set
            if (response.data) {
                navigate('/flight/seats', {
                    state: { passengers, seatData: response.data.data, fareId, searchKey, flightKey:response.data.updatedflightKey, totalPrice: calculateTotalPrice() }
                });
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            setSubmitting(false);
        }
    };

    // Enable editing passenger details
    const enableEditing = (index) => {
        const newPassengers = [...passengers];
        newPassengers[index].saved = false;
        setPassengers(newPassengers);
    };

    return (
        <div className="container mt-3">
            <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-3">
                Back
            </button>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-4">Add Passenger</h4>
                <button type="button" onClick={addPassenger} className="btn btn-primary">
                    Add New
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {passengers.map((passenger, index) => (
                    <div key={index} className="passenger-form mb-2">
                        {passenger.saved ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h5 style={{ marginRight: '8px' }}>
                                    {`${passenger.First_Name} ${passenger.Last_Name}`}
                                </h5>
                                <button
                                    type="button"
                                    onClick={() => enableEditing(index)}
                                    className="btn btn-warning me-2"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deletePassenger(index)}
                                    className="btn btn-danger"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        ) : null}

                        {passenger.saved ? null : (
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Pax Type</label>
                                    <select
                                        name="Pax_type"
                                        value={passenger.Pax_type}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="0">Adult</option>
                                        <option value="1">Child</option>
                                        <option value="2">Infant</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Title</label>
                                    <select
                                        name="Title"
                                        value={passenger.Title}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select Title</option>
                                        <option value="MR">MR</option>
                                        <option value="MRS">MRS</option>
                                        <option value="MS">MS</option>
                                        <option value="MSTR">MSTR (Child/Infant)</option>
                                        <option value="MISS">MISS (Child/Infant)</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="First_Name"
                                        value={passenger.First_Name}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="Last_Name"
                                        value={passenger.Last_Name}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        name="Gender"
                                        value={passenger.Gender}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <p><label className="form-label">Date of Birth</label></p>
                                    <DatePicker
                                        selected={passenger.DOB}
                                        onChange={(date) => updateDOB(index, date)}
                                        className="form-control"
                                        dateFormat="MM/dd/yyyy"
                                        showYearDropdown
                                        showMonthDropdown
                                        maxDate={new Date()}
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={200}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Passport Number</label>
                                    <input
                                        type="text"
                                        name="Passport_Number"
                                        value={passenger.Passport_Number}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Passport Issuing Country</label>
                                    <select
                                        name="Passport_Issuing_Country"
                                        value={passenger.Passport_Issuing_Country}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countryList.map((country, i) => (
                                            <option key={i} value={country.name}>
                                                {country.flag} {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Passport Expiry Date</label>
                                    <DatePicker
                                        selected={passenger.Passport_Expiry}
                                        onChange={(date) => {
                                            const newPassengers = [...passengers];
                                            newPassengers[index].Passport_Expiry = date;
                                            setPassengers(newPassengers);
                                        }}
                                        className="form-control"
                                        dateFormat="MM/dd/yyyy"
                                        minDate={new Date()}
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={200}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nationality</label>
                                    <select
                                        name="Nationality"
                                        value={passenger.Nationality}
                                        onChange={(e) => handlePassengerChange(index, e)}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select Nationality</option>
                                        {countryList.map((country, i) => (
                                            <option key={i} value={country.name}>
                                                {country.flag} {country.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        )}

                        {passenger.saved ? (
                            <>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => savePassenger(index)}
                                    className="btn btn-primary m-2"
                                >
                                    Save
                                </button>
                                <button type="button" onClick={cancelAddingPassenger} className="btn btn-secondary m-2">
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                ))}

                <div className="row col-md-2 gap-2">
                    <button type="submit" className="btn btn-success" disabled={submitting}>
                        {submitting ? 'Getting...' : 'View Seats'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookFlights;
