import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlightOptions from './flight/FlightOptions';
import Oneway from './flight/Oneway';
import Roundtrip from './flight/Roundtrip';
import Multicity from './flight/Multicity';
import { updateFlightDetails, searchFlights } from '../../../../redux/flightSlice';

const Flight = () => {
  const dispatch = useDispatch();
  const { flightDetails, searchResult, loading, error } = useSelector((state) => state.flights);

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
      <FlightOptions />

      <div className="tab-content" id="myTabContent1">
        <Oneway
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
          handleSearch={handleSearch}
        />

        <Roundtrip
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
          updateBookingTypeAndSearch={handleBookingTypeChange}
        />

        <Multicity
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default Flight;
