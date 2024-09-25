import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFlightDetails, searchFlights } from '../../../../redux/flightSlice';
import FlightSearchForm from './flight/FlightSearchForm';

const Flight = () => {
  const dispatch = useDispatch();
  const { flightDetails } = useSelector((state) => state.flights);

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

  const handleSearch = () => {
    dispatch(searchFlights(flightDetails));
  };

  const handleBookingTypeChange = (newBookingType) => {
    dispatch(updateFlightDetails({ Booking_Type: newBookingType.toString() }));
  };

  return (
    <div className="tab-pane fade show active" id="flights" role="tabpanel" aria-labelledby="flights-tab">

      <div className="tab-content" id="myTabContent1">
        <FlightSearchForm
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
          updateBookingTypeAndSearch={handleBookingTypeChange}
        />
      </div>
    </div>
  );
};

export default Flight;
