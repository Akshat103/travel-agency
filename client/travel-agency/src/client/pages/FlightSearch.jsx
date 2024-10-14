import React, { useState } from 'react';
import Filter from '../components/flightpage/Filter';
import ListFlights from '../components/flightpage/ListFlights';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchResult, updateSearchKey, updateFlightDetails } from '../../redux/flightSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const FlightSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const flightDetails = useSelector((state) => state.flights.flightDetails);

  const handleSearch = async (details) => {
    setIsSearching(true);
    const toastId = toast.info('Searching...', { autoClose: false });

    // Calculate travel type based on origin and destination
    const travelType = details.Origin.COUNTRYCODE === details.Destination.COUNTRYCODE ? "0" : "1";
    
    // Add travelType directly to details
    const updatedDetails = { ...details, Travel_Type: travelType };
    
    // Update flight details in Redux
    dispatch(updateFlightDetails(updatedDetails));

    // Check required fields before calling the API
    const requiredFields = [
      'Origin.AIRPORTCODE',
      'Origin.COUNTRYCODE',
      'Destination.AIRPORTCODE',
      'Destination.COUNTRYCODE',
      'TravelDate',
      'Booking_Type',
      'Adult_Count',
      'Class_Of_Travel'
    ];

    const checkField = (obj, fieldPath) =>
      fieldPath
        .split('.')
        .reduce((o, key) => (o !== undefined && o[key] !== undefined ? o[key] : null), obj);

    // Check all required fields
    for (const field of requiredFields) {
      const fieldValue = checkField(details, field);
      if (fieldValue === null || fieldValue === '') {
        toast.dismiss(toastId);
        setIsSearching(false);
        return;
      }
    }

    // Proceed to search after validating fields
    try {
      const response = await axios.post('/api/flightsearch', {
        requestdata: updatedDetails,
      });

      const flights = response.data.data[0].Flights;
      const searchKey = response.data.Search_Key;

      // Dispatch to Redux store
      dispatch(updateSearchResult(flights));
      dispatch(updateSearchKey(searchKey));

      toast.dismiss(toastId);
      toast.success('Flights found successfully!');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Error searching flights. Please try again.');
      console.error('Error searching flights:', error);
    } finally {
      setIsSearching(false);
    }
  };


  return (
    <>
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
                Soar to New Heights: Unbeatable Flight Deals Await!
              </h3>
            </div>
          </div>
          <div className="col-md-3" style={{ borderRadius: '20px' }}>
            <Filter onSearch={handleSearch} />
          </div>
          <div className="col-md-9">
            {/* Since we're storing the flights in Redux, we will connect ListFlights to Redux */}
            <ListFlights isSearching={isSearching} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
