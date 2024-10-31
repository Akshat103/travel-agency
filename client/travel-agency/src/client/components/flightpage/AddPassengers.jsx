import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import countryList from '../../../assets/data/countries_name_flag.json';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
    updatePassengers,
    updatePassenger,
} from '../../../redux/flightSlice';
import Spinner from '../../../components/Spinner';

const AddPassengers = () => {
    const location = useLocation();
    const { fareId, flightKey, reprice, price } = location.state || { fareId: null, flightKey: null, reprice: null, price: null };
    const searchKey = useSelector((state) => state.flights.searchKey);
    const flightDetails = useSelector((state) => state.flights.flightDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const passengers = useSelector((state) => state.flights.passengers);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Initialize passengers based on flightDetails
        let count = 1;
        const initialPassengers = [];
        for (let i = 0; i < flightDetails.Adult_Count; i++) {
            initialPassengers.push(createPassenger('0', count++));
        }
        for (let i = 0; i < flightDetails.Child_Count; i++) {
            initialPassengers.push(createPassenger('1', count++));
        }
        for (let i = 0; i < flightDetails.Infant_Count; i++) {
            initialPassengers.push(createPassenger('2', count++));
        }
        dispatch(updatePassengers(initialPassengers));
    }, [flightDetails, dispatch]);

    const createPassenger = (paxType, count) => ({
        passengerCount: count,
        Pax_type: paxType,
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
        SSR_Key: '',
        seat: '',
        price: price || 0
    });

    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        dispatch(updatePassenger({ index, data: { [name]: value } }));
    };

    const isTravelTypeInternational = flightDetails.Travel_Type === "1";
    const savePassenger = (index) => {
        const passenger = passengers[index];

        if (
            passenger.First_Name &&
            passenger.Last_Name &&
            passenger.Gender &&
            passenger.DOB &&
            (isTravelTypeInternational
                ? passenger.Passport_Number &&
                passenger.Passport_Issuing_Country &&
                passenger.Passport_Expiry
                : true) &&
            passenger.Nationality
        ) {
            dispatch(updatePassenger({ index, data: { saved: true } }));
        } else {
            toast.warn('Please fill in all required fields before saving.');
        }
    };

    const calculateTotalPrice = () => {
        return passengers.reduce((total, passenger) => total + (passenger.price || 0), 0);
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
        const updatedPassenger = {
            ...passengers[index],
            DOB: date,
            Age: calculateAge(date),
        };

        const newPassengers = [
            ...passengers.slice(0, index),
            updatedPassenger,
            ...passengers.slice(index + 1)
        ];

        dispatch(updatePassengers(newPassengers));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passengers.some(p => !p.saved)) {
            toast.error('Please save all passenger details before proceeding.');
            return;
        }

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

            if (response.data) {
                navigate('/flight/seats', {
                    state: { seatData: response.data.data, fareId, searchKey, flightKey: response.data.updatedflightKey, totalPrice: calculateTotalPrice() }
                });
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            setSubmitting(false);
        }
    };

    const enableEditing = (index) => {
        const newPassengers = passengers.map((passenger, i) =>
            i === index ? { ...passenger, saved: false } : passenger
        );
        dispatch(updatePassengers(newPassengers));
    };


    const getPaxTypeLabel = (paxType) => {
        switch (paxType) {
            case '0': return 'Adult';
            case '1': return 'Child';
            case '2': return 'Infant';
            default: return 'Unknown';
        }
    };

    return (
        <>
            <Spinner show={submitting} />
            <div className="container mt-3" style={{ minHeight: '100vh' }}>
                <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-3">
                    Back
                </button>
                <h4 className="mb-4">Complete Passenger Details</h4>

                <form onSubmit={handleSubmit}>
                    {passengers.map((passenger, index) => (
                        <div key={index} className="passenger-form mb-4">
                            <h5>{`Passenger (${getPaxTypeLabel(passenger.Pax_type)})`}</h5>
                            {passenger.saved ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h4 style={{ marginRight: '8px' }}>
                                        {`${passenger.First_Name} ${passenger.Last_Name}`}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => enableEditing(index)}
                                        className="btn btn-warning me-2"
                                    >
                                        <MdEdit />
                                    </button>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <p><label className="form-label">First Name</label></p>
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
                                        <p><label className="form-label">Last Name</label></p>
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
                                        <p><label className="form-label">Gender</label></p>
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

                                    {isTravelTypeInternational && (
                                        <>
                                            <div className="col-md-6 mb-3">
                                                <p><label className="form-label">Passport Number</label></p>
                                                <input
                                                    type="text"
                                                    name="Passport_Number"
                                                    value={passenger.Passport_Number}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <p><label className="form-label">Passport Issuing Country</label></p>
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
                                                <p><label className="form-label">Passport Expiry Date</label></p>
                                                <DatePicker
                                                    selected={passenger.Passport_Expiry}
                                                    onChange={(date) => {
                                                        const updatedPassenger = {
                                                            ...passengers[index],
                                                            Passport_Expiry: date,
                                                        };
                                                        const newPassengers = [
                                                            ...passengers.slice(0, index),
                                                            updatedPassenger,
                                                            ...passengers.slice(index + 1)
                                                        ];

                                                        dispatch(updatePassengers(newPassengers));
                                                    }}
                                                    className="form-control"
                                                    dateFormat="MM/dd/yyyy"
                                                    minDate={new Date()}
                                                    scrollableYearDropdown
                                                    yearDropdownItemNumber={200}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="col-md-6 mb-3">
                                        <p><label className="form-label">Nationality</label></p>
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

                            {!passenger.saved && (
                                <button
                                    type="button"
                                    onClick={() => savePassenger(index)}
                                    className="btn btn-primary mt-2"
                                >
                                    Save
                                </button>
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
        </>
    );
};

export default AddPassengers;