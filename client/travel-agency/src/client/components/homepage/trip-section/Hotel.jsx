import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, updateRoomDetail, addRoom, removeRoom, updateFormField } from '../../../../redux/hotelSlice';
import { useNavigate } from 'react-router-dom';

const Hotel = ({ isVertical, onSearch }) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.hotel.formData);

    const [citySuggestions, setCitySuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                fetchCitySuggestions(searchQuery);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchCitySuggestions = async (query) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/hotelcity', { cityname: query });
            setCitySuggestions(response.data.data);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormField({ field: name, value }));
    };

    const handleCityInputChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        dispatch(updateFormField({ field: 'fullName', value }));
    };

    const handleRoomDetailChange = (index, field, value) => {
        const updatedRoomDetail = formData.HotelRoomDetail.map((room, i) => {
            if (i === index) {
                return { ...room, [field]: value };
            }
            return room;
        });
        dispatch(updateRoomDetail(updatedRoomDetail));
    };

    const addChild = (roomIndex) => {
        const updatedRoomDetail = formData.HotelRoomDetail.map((room, index) => {
            if (index === roomIndex) {
                return {
                    ...room,
                    ChildCount: room.ChildCount + 1,
                    ChildAges: [...room.ChildAges, 0],
                };
            }
            return room;
        });
        dispatch(updateRoomDetail(updatedRoomDetail));
    };

    const removeChild = (roomIndex) => {
        const updatedRoomDetail = formData.HotelRoomDetail.map((room, index) => {
            if (index === roomIndex && room.ChildCount > 0) {
                return {
                    ...room,
                    ChildCount: room.ChildCount - 1,
                    ChildAges: room.ChildAges.slice(0, -1),
                };
            }
            return room;
        });
        dispatch(updateRoomDetail(updatedRoomDetail));
    };

    const handleChildAgeChange = (roomIndex, childIndex, age) => {
        const updatedRoomDetail = formData.HotelRoomDetail.map((room, index) => {
            if (index === roomIndex) {
                return {
                    ...room,
                    ChildAges: room.ChildAges.map((childAge, i) =>
                        i === childIndex ? age : childAge
                    ),
                };
            }
            return room;
        });
        dispatch(updateRoomDetail(updatedRoomDetail));
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (isVertical) {
            onSearch();
        } else {
            navigate('/hotel');
        }
    };

    const handleCitySelect = (city) => {
        dispatch(setFormData({
            ...formData,
            fullName: city.fullName,
            city: city
        }));
        setCitySuggestions([]);
    };

    return (
        <div className={`tab-pane ${isVertical ? 'vertical-layout' : ''}`} id="hotels" role="tabpanel" aria-labelledby="hotels-tab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="tour_search_form">
                        <div className={`row ${isVertical ? 'flex-column gap-4' : 'm-4 justify-content-center align-items-center gap-4'}`}>
                            <div className={`${isVertical ? '' : 'col-md-2'} flight_Search_boxed date_flex_area`}>
                                <div className="Journey_date">
                                    <p>Check-in Date</p>
                                    <input
                                        type="date"
                                        id="CheckInDate"
                                        name="CheckInDate"
                                        value={formData.CheckInDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={`${isVertical ? '' : 'col-md-2'} flight_Search_boxed date_flex_area`}>
                                <div className="Journey_date">
                                    <p>Check-out Date</p>
                                    <input
                                        type="date"
                                        id="CheckOutDate"
                                        name="CheckOutDate"
                                        value={formData.CheckOutDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={`${isVertical ? '' : 'col-md-2'} flight_Search_boxed`}>
                                <p>City Name</p>
                                <div style={{ overflow: 'hidden' }}>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter city"
                                        style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                                        value={formData.fullName}
                                        onChange={handleCityInputChange}
                                        required
                                    />
                                </div>
                                {citySuggestions.length > 0 && (
                                    <ul className="suggestions-list" style={{
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        margin: 0,
                                        padding: 0,
                                        listStyleType: 'none',
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        zIndex: 10,
                                        backgroundColor: 'white',
                                        border: '1px solid #ddd',
                                    }}>
                                        {citySuggestions.slice(0, 3).map((city, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleCitySelect(city)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '8px',
                                                    borderBottom: '1px solid #ddd'
                                                }}
                                            >
                                                {city.fullName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className={`${isVertical ? '' : 'col-md-2'} mb-4 flight_Search_boxed`}>
                                <p className="mb-0 me-2">Rooms</p>
                                <div className="d-flex align-items-center">
                                    <button onClick={() => dispatch(removeRoom())} disabled={formData.RoomCount <= 1} style={{ border: "none" }}>
                                        <MinusCircleIcon />
                                    </button>
                                    <span className="mx-2">{formData.RoomCount}</span>
                                    <button onClick={() => dispatch(addRoom())} style={{ border: "none" }}>
                                        <PlusCircleIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`row ${isVertical ? 'flex-column gap-4' : 'justify-content-center align-items-center gap-4'}`}>
                            {formData.HotelRoomDetail.map((room, roomIndex) => (
                                <div key={roomIndex} className={`${isVertical ? '' : 'col-md-2'} flight_Search_boxed`}>
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
                                            <p className="pe-4">Children</p>
                                            <button onClick={() => removeChild(roomIndex)} disabled={room.ChildCount <= 0} style={{ border: "none" }}>
                                                <MinusCircleIcon />
                                            </button>
                                            <span className="mx-2">{room.ChildCount}</span>
                                            <button onClick={() => addChild(roomIndex)} style={{ border: "none" }}>
                                                <PlusCircleIcon />
                                            </button>
                                        </div>

                                        {room.ChildAges.map((age, childIndex) => (
                                            <div key={childIndex} className="mt-2">
                                                <p>Age of child {childIndex + 1}:</p>
                                                <input
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => handleChildAgeChange(roomIndex, childIndex, parseInt(e.target.value))}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <button onClick={handleSubmit} className="btn btn-primary">Search Hotels</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;
