import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ListHotel from '../components/hotelpage/ListHotel';
import Hotel from '../components/homepage/trip-section/Hotel';
import { setHotelData } from '../../redux/hotelSlice';

const HotelSearch = () => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.hotel.formData);
  const hotelData = useSelector((state) => state.hotel.hotelData);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async () => {
    setIsSearching(true);

    // Validate the formData fields
    const { CheckInDate, CheckOutDate, RoomCount, HotelRoomDetail } = formData;

    if (!CheckInDate || !CheckOutDate || RoomCount <= 0 || !HotelRoomDetail || HotelRoomDetail.length === 0) {
      setIsSearching(false);
      return;
    }

    try {
      const response = await axios.post('/api/hotelbycity', { formData });

      if (response.data.statuscode === "TXN" && response.data.msg === "SUCCESS") {
        const hotelsWithFare = response.data.data.HotelContents.map((hotel, index) => {
          const fareDetails = response.data.data.HotelFareDetails[index];
          return {
            ...hotel,
            fareDetails
          };
        });
        hotelsWithFare.searchKey = response.data.data.SearchKey;
        dispatch(setHotelData(hotelsWithFare));
      } else {
        toast.error("No hotels found for your search.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching hotels.");
    } finally {
      setIsSearching(false);
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (hotelData.length === 0) {
      handleSearch();
    }
  }, [hotelData, formData]);

  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="fw-bold text-white p-4 rounded"
              style={{
                background: 'linear-gradient(90deg, #8c3eea, #d063f0)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                fontSize: '1.2rem'
              }}
            >
              Comfort and Luxury Awaits – Book Your Hotel Now
            </h3>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row p-2">
            <div className="col-md-3" style={{ borderRadius: '20px' }}>
              <Hotel layout="col" isVertical={true} onSearch={handleSearch} />
            </div>
            <div className="col-md-9">
              <ListHotel
                isSearching={isSearching}
                hotels={hotelData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
