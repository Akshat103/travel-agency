import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DateRangeInput from './DateRangeInput';
import PassengerDetails from './PassengerDetails';
import { useNavigate } from 'react-router-dom';

const FlightSearchForm = ({
  flightDetails,
  handleSelectOrigin,
  handleSelectDestination,
  handleDateChange,
  handlePassengerCountChange,
  handleClassChange,
}) => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const navigate = useNavigate();

  const clickSearch = (event) => {
    event.preventDefault();
    navigate('/flight-details');
  };

  const toggleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  return (
    <div className='col justify-content-center align-items-center'>
      <div >

        <div className='row justify-content-center align-items-center'>
          <div className="col-lg-2 col-md-6 col-sm-12 col-12">
            <div className="flight_Search_boxed">
              <LocationInput label="From" onSelect={handleSelectOrigin} />
              <div className="plan_icon_posation">
                <i className="fas fa-plane-departure"></i>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-12 col-12">
            <div className="flight_Search_boxed">
              <LocationInput label="To" onSelect={handleSelectDestination} />
              <div className="plan_icon_posation">
                <i className="fas fa-plane-arrival"></i>
              </div>
              <div className="range_plan">
                <i className="fas fa-exchange-alt"></i>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 col-sm-12 col-12">
            <DateRangeInput
              isRoundTrip={isRoundTrip}
              startDate={flightDetails.TravelDate}
              endDate={flightDetails.DepartureDate}
              onChange={handleDateChange}
              onColumn="col"
            />
          </div>

          <div className="col-lg-2 col-md-6 col-sm-12 col-12">
            <PassengerDetails
              flightDetails={flightDetails}
              onPassengerCountChange={handlePassengerCountChange}
              onClassChange={handleClassChange}
              useDropdown={true}
            />
          </div>
        </div>

        <div className='row justify-content-center align-items-center m-2'>
          

          <div className="col-lg-2 col-md-6 col-sm-12 col-12">
            <input
              type="checkbox"
              id="roundTripToggle"
              checked={isRoundTrip}
              onChange={toggleRoundTrip}
            />
            <label htmlFor="roundTripToggle" className="ml-2">
              Round Trip
            </label>
          </div>
        </div>

      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn_theme btn_md" onClick={clickSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
