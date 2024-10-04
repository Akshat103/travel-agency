import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls

const Hotel = () => {
    const [formData, setFormData] = useState({
        CheckInDate: '',
        CheckOutDate: '',
        HotelRoomDetail: [
            {
                AdultCount: 1,
                ChildCount: 0,
                ChildAges: []
            }
        ],
        fullName: '',
        city: null,
        RoomCount: 1
    });

    const [citySuggestions, setCitySuggestions] = useState([]); // Store city suggestions
    const [searchQuery, setSearchQuery] = useState(''); // For debouncing user input
    const [loading, setLoading] = useState(false); // To show a loader during API calls

    // Debouncing function to handle API call
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                fetchCitySuggestions(searchQuery);
            }
        }, 500); // Delay of 500ms

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // API call to fetch city suggestions
    const fetchCitySuggestions = async (query) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/hotelcity', {
                data: {
                    cityname: query
                }
            });
                setCitySuggestions(response.data.data);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleinputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCityInputChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        setFormData(prevData => ({
            ...prevData,
            fullName: value
        }));
    };

    const handleRoomDetailChange = (index, field, value) => {
        const updatedRoomDetail = [...formData.HotelRoomDetail];
        updatedRoomDetail[index] = { ...updatedRoomDetail[index], [field]: value };
        setFormData(prevData => ({
            ...prevData,
            HotelRoomDetail: updatedRoomDetail
        }));
    };

    const addChild = (roomIndex) => {
        const updatedRoomDetail = [...formData.HotelRoomDetail];
        updatedRoomDetail[roomIndex].ChildCount++;
        updatedRoomDetail[roomIndex].ChildAges.push(0);
        setFormData(prevData => ({
            ...prevData,
            HotelRoomDetail: updatedRoomDetail
        }));
    };

    const removeChild = (roomIndex) => {
        const updatedRoomDetail = [...formData.HotelRoomDetail];
        if (updatedRoomDetail[roomIndex].ChildCount > 0) {
            updatedRoomDetail[roomIndex].ChildCount--;
            updatedRoomDetail[roomIndex].ChildAges.pop();
            setFormData(prevData => ({
                ...prevData,
                HotelRoomDetail: updatedRoomDetail
            }));
        }
    };

    const handleChildAgeChange = (roomIndex, childIndex, age) => {
        const updatedRoomDetail = [...formData.HotelRoomDetail];
        updatedRoomDetail[roomIndex].ChildAges[childIndex] = age;
        setFormData(prevData => ({
            ...prevData,
            HotelRoomDetail: updatedRoomDetail
        }));
    };

    const addRoom = () => {
        setFormData(prevData => ({
            ...prevData,
            HotelRoomDetail: [
                ...prevData.HotelRoomDetail,
                { AdultCount: 1, ChildCount: 0, ChildAges: [] }
            ],
            RoomCount: prevData.RoomCount + 1
        }));
    };

    const removeRoom = () => {
        if (formData.RoomCount > 1) {
            setFormData(prevData => ({
                ...prevData,
                HotelRoomDetail: prevData.HotelRoomDetail.slice(0, -1),
                RoomCount: prevData.RoomCount - 1
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send the data to your backend or perform further actions
    };

    return (
        <div className="tab-pane fade" id="hotels" role="tabpanel" aria-labelledby="hotels-tab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="tour_search_form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="row m-4 justify-content-center align-items-center gap-4">

                                    <div className="col-md-2 flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                            <p>Check-in Date</p>
                                            <input
                                                type="date"
                                                id="CheckInDate"
                                                name="CheckInDate"
                                                value={formData.CheckInDate}
                                                onChange={handleinputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                            <p>Check-out Date</p>
                                            <input
                                                type="date"
                                                id="CheckOutDate"
                                                name="CheckOutDate"
                                                value={formData.CheckOutDate}
                                                onChange={handleinputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2 flight_Search_boxed">
                                        <p>City Name</p>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Enter city"
                                            value={formData.fullName}
                                            onChange={handleCityInputChange}
                                            required
                                        />
                                        {/* Display suggestions */}
                                        {citySuggestions.length > 0 && (
                                            <ul className="suggestions-list">
                                                {citySuggestions.map((city, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => setFormData({ ...formData, fullName: city.fullName })}
                                                    >
                                                        {city.fullName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="col-md-2 flight_Search_boxed">
                                        <p className="mb-0 me-2">Rooms</p>
                                        <div className="d-flex align-items-center">
                                            <button onClick={removeRoom} disabled={formData.RoomCount <= 1} style={{ border: "none" }}>
                                                <MinusCircleIcon />
                                            </button>
                                            <span className="mx-2">{formData.RoomCount}</span>
                                            <button onClick={addRoom} style={{ border: "none" }}>
                                                <PlusCircleIcon />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className="row justify-content-center align-items-center gap-4">
                                    {formData.HotelRoomDetail.map((room, roomIndex) => (
                                        <div key={roomIndex} className="col-md-2 flight_Search_boxed">
                                            <p><strong>Room {roomIndex + 1}</strong></p>
                                            <div className="space-y-2">
                                                <div className="d-flex align-items-center">
                                                    <p className="pe-4">Adults</p>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={room.AdultCount}
                                                        onChange={(e) => handleRoomDetailChange(roomIndex, 'AdultCount', parseInt(e.target.value))}
                                                        required
                                                    />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p>Children</p>
                                                    <button type="button" onClick={() => removeChild(roomIndex)} disabled={room.ChildCount === 0} style={{ border: "none" }}>
                                                        <MinusCircleIcon className="h-4 w-4" />
                                                    </button>
                                                    <span>{room.ChildCount}</span>
                                                    <button type="button" onClick={() => addChild(roomIndex)} style={{ border: "none" }}>
                                                        <PlusCircleIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div>
                                                    {room.ChildAges.map((age, childIndex) => (
                                                        <div key={childIndex} className="d-flex align-items-center">
                                                            <p>Child {childIndex + 1} Age</p>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max="12"
                                                                value={age}
                                                                onChange={(e) => handleChildAgeChange(roomIndex, childIndex, parseInt(e.target.value))}
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row justify-content-center mt-3">
                                    <div className="col-md-3">
                                        <button type="submit" className="w-100 btn btn_search">
                                            Search Hotels
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;
