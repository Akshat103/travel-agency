import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const BookHotel = () => {
    const location = useLocation();
    const { hotelId,
        hotelKey,
        recommendationId,
        rateplanId,
        hotelSearchDetails,
        searchKey } = location.state || {};

    let occupantCounter = 1;
    let adultCounter = 1;
    let childCounter = 1;

    const initialOccupantDetails = hotelSearchDetails.HotelRoomDetail
        ? hotelSearchDetails.HotelRoomDetail.flatMap((room, roomIndex) => {
            return [
                ...Array.from({ length: room.AdultCount }, () => ({
                    OccupantID: occupantCounter++,
                    FirstName: "",
                    LastName: "",
                    OccupantType: `Adult ${adultCounter++}`,
                    Title: "Mr",
                    RoomNo: roomIndex + 1,
                })),
                ...Array.from({ length: room.ChildCount }, () => ({
                    OccupantID: occupantCounter++,
                    FirstName: "",
                    LastName: "",
                    OccupantType: `Child ${childCounter++}`,
                    Title: "Mr",
                    RoomNo: roomIndex + 1,
                }))
            ];
        })
        : [];

    const [formData, setFormData] = useState({
        OccupantEmail: "",
        OccupantMobile: "",
        CustomerAddress: "",
        CustomerName: "",
        CustomerPostalCode: "",
        OccupantDetails: initialOccupantDetails,
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle occupant details change
    const handleOccupantChange = (index, field, value) => {
        const updatedOccupants = formData.OccupantDetails.map((occupant, i) =>
            i === index ? { ...occupant, [field]: value } : occupant
        );
        setFormData({ ...formData, OccupantDetails: updatedOccupants });
    };

    const callBook = async () => {
        try {
            const response = await fetch('/api/bookhotel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerDetails: formData,
                    hotelId,
                    hotelKey,
                    recommendationId,
                    rateplanId,
                    hotelSearchDetails,
                    searchKey
                }),
            });

            const result = await response.json();
            console.log(result)

            // if (result.statuscode === "TXN" && result.msg === "SUCCESS") {
            //     setExtraData(result.data);
            //     setRecommendations(result.data.RatePlanRecommendations || []);
            //     setHotelKey(result.data.HotelKey);
            // } else {
            //     console.error("Error fetching hotel details:", result.msg);
            // }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        callBook();
    };

    return (
        <div className="container mt-4">
            <h2>Book Hotel</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="OccupantEmail" className="form-label">
                        <FaEnvelope /> Occupant Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="OccupantEmail"
                        name="OccupantEmail"
                        value={formData.OccupantEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="OccupantMobile" className="form-label">
                        <FaPhone /> Occupant Mobile
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="OccupantMobile"
                        name="OccupantMobile"
                        value={formData.OccupantMobile}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerAddress" className="form-label">
                        <FaMapMarkerAlt /> Customer Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="CustomerAddress"
                        name="CustomerAddress"
                        value={formData.CustomerAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerName" className="form-label">
                        <FaUser /> Customer Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="CustomerName"
                        name="CustomerName"
                        value={formData.CustomerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerPostalCode" className="form-label">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="CustomerPostalCode"
                        name="CustomerPostalCode"
                        value={formData.CustomerPostalCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h4>Occupant Details</h4>
                {formData.OccupantDetails.map((occupant, index) => (
                    <div key={occupant.OccupantID} className="mb-3">
                        <h5>Occupant {index + 1} ({occupant.OccupantType})</h5>
                        <div className="row">
                            <div className="col">
                                <label htmlFor={`Title-${index}`} className="form-label">Title</label>
                                <select
                                    className="form-select"
                                    id={`Title-${index}`}
                                    value={occupant.Title}
                                    onChange={(e) => handleOccupantChange(index, 'Title', e.target.value)}
                                    required
                                >
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor={`FirstName-${index}`} className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`FirstName-${index}`}
                                    value={occupant.FirstName}
                                    onChange={(e) => handleOccupantChange(index, 'FirstName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor={`LastName-${index}`} className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`LastName-${index}`}
                                    value={occupant.LastName}
                                    onChange={(e) => handleOccupantChange(index, 'LastName', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button type="submit" className="btn btn-primary">Book Now</button>
            </form>
        </div>
    );
};

export default BookHotel;
