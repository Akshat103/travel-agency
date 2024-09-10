import React, { useState } from 'react';
import FlightOptions from './flight/FlightOptions';
import Oneway from './flight/Oneway';
import Roundtrip from './flight/Roundtrip';
import Multicity from './flight/Multicity';

const Flight = () => {
  const [flightDetails, setFlightDetails] = useState({
    Origin: {
      AIRPORTCODE: '',
      COUNTRYCODE: '',
    },
    Destination: {
      AIRPORTCODE: '',
      COUNTRYCODE: '',
    },
    TravelDate: '',
    DepartureDate: '',
    Booking_Type: '',
    Adult_Count: 0,
    Child_Count: 0,
    Infant_Count: 0,
    Class_Of_Travel: 'Economy',
  });

  const handleSelectOrigin = (airport) => {
    setFlightDetails((prev) => ({
      ...prev,
      Origin: {
        AIRPORTCODE: airport.AIRPORTCODE,
        COUNTRYCODE: airport.COUNTRYCODE,
      },
    }));
  };

  const handleSelectDestination = (airport) => {
    setFlightDetails((prev) => ({
      ...prev,
      Destination: {
        AIRPORTCODE: airport.AIRPORTCODE,
        COUNTRYCODE: airport.COUNTRYCODE,
      },
    }));
  };

  const handleDateChange = (startDate, endDate) => {
    setFlightDetails((prev) => ({
      ...prev,
      TravelDate: startDate,
      DepartureDate: endDate,
    }));
  };

  const handlePassengerCountChange = (type, change) => {
    setFlightDetails((prev) => ({
      ...prev,
      [`${type}_Count`]: Math.max(0, prev[`${type}_Count`] + change),
    }));
  };

  const handleClassChange = (newClass) => {
    setFlightDetails((prev) => ({
      ...prev,
      Class_Of_Travel: newClass,
    }));
  };

  return (
    <div className="tab-pane fade show active" id="flights" role="tabpanel" aria-labelledby="flights-tab">
      {/* Options */}
      <FlightOptions />

      <div className="tab-content" id="myTabContent1">
        {/* Oneway */}
        <Oneway
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
        />

        {/* Roundtrip */}
        <Roundtrip
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
        />

        {/* Multi City */}
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
