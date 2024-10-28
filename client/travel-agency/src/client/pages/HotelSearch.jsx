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
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const validateFormData = (data) => {
    const { CheckInDate, CheckOutDate, RoomCount, HotelRoomDetail, city } = data;
    
    if (!CheckInDate || !CheckOutDate) {
      toast.error("Please select check-in and check-out dates");
      return false;
    }
    
    if (!city || !city.fullName) {
      toast.error("Please select a city");
      return false;
    }
    
    if (RoomCount <= 0 || !HotelRoomDetail || HotelRoomDetail.length === 0) {
      toast.error("Please select valid room details");
      return false;
    }
    
    return true;
  };

  const searchHotels = async (searchFormData) => {
    if (!validateFormData(searchFormData)) {
      return;
    }

    setIsSearching(true);

    try {
      const response = await axios.post('/api/hotelbycity', { formData: searchFormData });

      if (response.data.statuscode === "TXN" && response.data.msg === "SUCCESS") {
        const hotelsWithFare = response.data.data.HotelContents.map((hotel, index) => ({
          ...hotel,
          fareDetails: response.data.data.HotelFareDetails[index]
        }));
        
        hotelsWithFare.searchKey = response.data.data.SearchKey;
        dispatch(setHotelData(hotelsWithFare));
      } else {
        toast.error("No hotels found for your search.");
        dispatch(setHotelData([]));
      }
    } catch (error) {
      console.error('Hotel search error:', error);
      toast.error("Error searching hotels. Please try again.");
      dispatch(setHotelData([]));
    } finally {
      setIsSearching(false);
    }
  };

  // Handle initial page load
  useEffect(() => {
    const performInitialSearch = async () => {
      if (!initialLoadComplete && formData.city) {
        await searchHotels(formData);
        setInitialLoadComplete(true);
      }
    };

    performInitialSearch();
  }, [initialLoadComplete, formData]);

  // Handle search button click
  const handleSearch = useCallback(() => {
    searchHotels(formData);
  }, [formData]);

  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="row">
          <div className="col-12 text-center">
            <h3
              className="fw-bold text-white p-4 rounded"
              style={{
                background: '#282a29',
                borderRadius: '10px',
                fontSize: '1.2rem'
              }}
            >
              Comfort and Luxury Awaits – Book Your Hotel Now
            </h3>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row p-2 pt-4">
            <div className="col-md-3" style={{ borderRadius: '20px' }}>
              <Hotel 
                layout="col" 
                isVertical={true} 
                onSearch={handleSearch} 
              />
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