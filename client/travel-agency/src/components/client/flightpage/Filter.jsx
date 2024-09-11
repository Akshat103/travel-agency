import React, { useEffect, useState } from 'react';
import LocationInput from "../homepage/trip-section/flight/LocationInput";
import DateRangeInput from '../homepage/trip-section/flight/DateRangeInput';
import PassengerDetails from '../homepage/trip-section/flight/PassengerDetails';
import { useFlight } from '../../../hooks/useFlight';

const Filter = ({ onSearch, setData, isSearching }) => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const {
    flightDetails,
    handleSelectOrigin,
    handleSelectDestination,
    handleDateChange,
    handlePassengerCountChange,
    handleClassChange,
    handleSearch,
    handleBookingTypeChange,
  } = useFlight();

  const handleToggleRoundTrip = () => {
    setIsRoundTrip(prev => !prev);
  };

  const handleSearchClick = async () => {
    isSearching(true);
    const data = await handleSearch();
    setData(data);
    isSearching(false);
    if (onSearch) onSearch();
  };  

   useEffect(() => {
    handleSearchClick();
  }, []);

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
          <button className="btn btn-primary w-100" onClick={handleSearchClick}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
