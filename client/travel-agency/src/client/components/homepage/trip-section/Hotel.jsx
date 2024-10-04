import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react';

const Hotel = () => {

    const [formData, setFormData] = useState({
        CheckInDate: '',
        CheckOutDate: '',
        HotelRoomDetail: [
            {
                AdultCount: 0,
                ChildCount: 0,
                ChildAges: []
            }
        ],
        fullName: '',
        city: null,
        RoomCount: 1
    });

    const handleinputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
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
        <div class="tab-pane fade" id="hotels" role="tabpanel" aria-labelledby="hotels-tab">
            <div class="row">
                <div class="col-lg-12">
                    <div class="tour_search_form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div class="row m-4 justify-content-center align-items-center gap-4">

                                    <div class="col-md-2 flight_Search_boxed date_flex_area">
                                        <div class="Journey_date">
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

                                    <div class="col-md-2 flight_Search_boxed date_flex_area">
                                        <div class="Journey_date">
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

                                    <div class="col-md-2 flight_Search_boxed">
                                        <p>City Name</p>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            placeholder='Enetr city'
                                            value={formData.fullName}
                                            onChange={handleinputChange}
                                            required
                                        />
                                    </div>

                                    <div class="col-md-2 flight_Search_boxed">
                                        <p class="mb-0 me-2">Rooms</p>
                                        <div className='d-flex align-items-center'>
                                            <button onClick={removeRoom} disabled={formData.RoomCount <= 1} style={{ border: "none" }}>
                                                <MinusCircleIcon />
                                            </button>
                                            <span class="mx-2">{formData.RoomCount}</span>
                                            <button onClick={addRoom} style={{ border: "none" }}>
                                                <PlusCircleIcon />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div class="row justify-content-center align-items-center gap-4">
                                    {formData.HotelRoomDetail.map((room, roomIndex) => (
                                        <div key={roomIndex} className="col-md-2 flight_Search_boxed">
                                            <p><strong>Room {roomIndex + 1}</strong></p>
                                            <div className="space-y-2">
                                                <div className='d-flex align-items-center'>
                                                    <p className='pe-4'>Adults</p>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={room.AdultCount}
                                                        onChange={(e) => handleRoomDetailChange(roomIndex, 'AdultCount', parseInt(e.target.value))}
                                                        required
                                                    />
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p>Children</p>
                                                    <button type="button" onClick={() => removeChild(roomIndex)} disabled={room.ChildCount === 0} style={{ border: "none" }}>
                                                        <MinusCircleIcon className="h-4 w-4" />
                                                    </button>
                                                    <span>{room.ChildCount}</span>
                                                    <button type="button" onClick={() => addChild(roomIndex)} style={{ border: "none" }}>
                                                        <PlusCircleIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div >
                                                    {room.ChildAges.map((age, childIndex) => (
                                                        <div key={childIndex} className='d-flex align-items-center'>
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
                            </div>
                            <div class="top_form_search_button">
                                <button class="btn btn_theme btn_md">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hotel
