import React, { useState } from 'react';
import LocationInput from './LocationInput';
import DateRangeInput from './DateRangeInput';
import PassengerDetails from './PassengerDetails';
import { useNavigate } from 'react-router-dom';
import { MdCompareArrows, MdArrowForward } from 'react-icons/md';

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
    navigate('/flights');
  };

  const toggleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  return (
    <div className='col justify-content-center align-items-center'>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <div className="form-check form-switch d-flex align-items-center gap-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="roundTripToggle"
            checked={isRoundTrip}
            onChange={toggleRoundTrip}
            style={{
              width: '60px',
              height: '30px',
              cursor: 'pointer',
              marginTop: '0'
            }}
          />
          <label
            className="form-check-label d-flex align-items-center gap-2 mb-0"
            htmlFor="roundTripToggle"
            style={{ cursor: 'pointer' }}
          >
            {isRoundTrip ? (
              <>
                <MdCompareArrows size={24} />
                <span>Round Trip</span>
              </>
            ) : (
              <>
                <MdArrowForward size={24} />
                <span>One Way</span>
              </>
            )}
          </label>
        </div>
      </div>

      <div>
        <div className='row justify-content-center align-items-center'>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <div className="flight_Search_boxed">
              <LocationInput label="From" onSelect={handleSelectOrigin} />
              <div className="plan_icon_posation">
                <i className="fas fa-plane-departure"></i>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
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

          <DateRangeInput
            isRoundTrip={isRoundTrip}
            startDate={flightDetails.TravelDate}
            endDate={flightDetails.DepartureDate}
            onChange={handleDateChange}
            onHome={true}
          />

        </div>

        <div className='row justify-content-center align-items-center'>
          <div className="col-lg-3 col-md-6 col-sm-12 col-12">
            <PassengerDetails
              flightDetails={flightDetails}
              onPassengerCountChange={handlePassengerCountChange}
              onClassChange={handleClassChange}
              useDropdown={true}
            />
          </div>


        </div>

      </div>

      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={clickSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
