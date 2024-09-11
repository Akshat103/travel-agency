import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationInput from "../homepage/trip-section/flight/LocationInput";
import DateRangeInput from '../homepage/trip-section/flight/DateRangeInput';
import PassengerDetails from '../homepage/trip-section/flight/PassengerDetails';
import { updateFlightDetails } from '../../../redux/flightSlice';

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { flightDetails } = useSelector((state) => state.flights);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  
  const handleSelectOrigin = (airport) => {
    dispatch(updateFlightDetails({ Origin: { AIRPORTCODE: airport.AIRPORTCODE, COUNTRYCODE: airport.COUNTRYCODE } }));
  };
  
  const handleSelectDestination = (airport) => {
    dispatch(updateFlightDetails({ Destination: { AIRPORTCODE: airport.AIRPORTCODE, COUNTRYCODE: airport.COUNTRYCODE } }));
  };
  
  const handleDateChange = (startDate, endDate) => {
    dispatch(updateFlightDetails({ TravelDate: startDate, DepartureDate: endDate }));
  };
  
  const handlePassengerCountChange = (type, change) => {
    dispatch(updateFlightDetails({ [`${type}_Count`]: Math.max(0, flightDetails[`${type}_Count`] + change) }));
  };
  
  const handleClassChange = (newClass) => {
    dispatch(updateFlightDetails({ Class_Of_Travel: newClass }));
  };
  
  const handleToggleRoundTrip = () => {
    setIsRoundTrip(prev => !prev);
    dispatch(updateFlightDetails({ Booking_Type: isRoundTrip ? '0' : '1' }));
  };
  
  useEffect(() => {
    onSearch(flightDetails);
  }, []);  // Added `isRoundTrip` to the dependency array

  return (
    <div className="container p-3">
      <h4 className="mb-4">Filter</h4>
      <div className="row row-cols-1 g-4">
        <div className="col">
          <div className="flight_Search_boxed position-relative">
            <LocationInput label="From" onSelect={handleSelectOrigin} />
            <div className="position-absolute top-50 end-0 translate-middle-y me-3">
              <i className="fas fa-plane-departure"></i>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="flight_Search_boxed position-relative">
            <LocationInput label="To" onSelect={handleSelectDestination} />
            <div className="position-absolute top-50 end-0 translate-middle-y me-3">
              <i className="fas fa-plane-arrival"></i>
            </div>
          </div>
        </div>
        <div className="col">
          <DateRangeInput
            onColumn={false}
            isRoundTrip={isRoundTrip}
            startDate={flightDetails.TravelDate}
            endDate={flightDetails.DepartureDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="roundTrip"
              checked={isRoundTrip}
              onChange={handleToggleRoundTrip}
            />
            <label className="form-check-label" htmlFor="roundTrip">
              Round Trip
            </label>
          </div>
        </div>
        <div className="col">
          <PassengerDetails
            flightDetails={flightDetails}
            onPassengerCountChange={handlePassengerCountChange}
            onClassChange={handleClassChange}
            useDropdown={false}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" onClick={() => onSearch(flightDetails)}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
