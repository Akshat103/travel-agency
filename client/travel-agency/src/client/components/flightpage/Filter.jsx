import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationInput from "../homepage/trip-section/flight/LocationInput";
import DateRangeInput from '../homepage/trip-section/flight/DateRangeInput';
import PassengerDetails from '../homepage/trip-section/flight/PassengerDetails';
import { updateFlightDetails } from '../../../redux/flightSlice';
import { MdArrowForward, MdCompareArrows } from 'react-icons/md';

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { flightDetails } = useSelector((state) => state.flights);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleSelectOrigin = (airport) => {
    dispatch(updateFlightDetails({ Origin: { AIRPORTCODE: airport.AIRPORTCODE, COUNTRYCODE: airport.COUNTRYCODE } }));
    const travelType = flightDetails.Origin.COUNTRYCODE === flightDetails.Destination.COUNTRYCODE ? "0" : "1";
    dispatch(updateFlightDetails({ Travel_Type: travelType }))
  };

  const handleSelectDestination = (airport) => {
    dispatch(updateFlightDetails({ Destination: { AIRPORTCODE: airport.AIRPORTCODE, COUNTRYCODE: airport.COUNTRYCODE } }));
    const travelType = flightDetails.Origin.COUNTRYCODE === flightDetails.Destination.COUNTRYCODE ? "0" : "1";
    dispatch(updateFlightDetails({ Travel_Type: travelType }))
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
  }, []);

  return (
    <div className="container p-3">
      <div className="row row-cols-1 g-4">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <div className="form-check form-switch d-flex align-items-center gap-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="roundTripToggle"
                checked={isRoundTrip}
                onChange={handleToggleRoundTrip}
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
        </div>
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
            onHome={false}
            isRoundTrip={isRoundTrip}
            startDate={flightDetails.TravelDate}
            endDate={flightDetails.DepartureDate}
            onChange={handleDateChange}
          />
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
