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
    <div>
      <h4>Hotels</h4>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-md-3 bg-light" style={{ borderRadius: '20px' }}>
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
  );
};

export default HotelSearch;
