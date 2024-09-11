import React, { useState } from 'react';
import FlightOptions from './flight/FlightOptions';
import Oneway from './flight/Oneway';
import Roundtrip from './flight/Roundtrip';
import Multicity from './flight/Multicity';
import { useFlight } from '../../../../hooks/useFlight';

const Flight = () => {
  
  const {
    flightDetails,
    handleSelectOrigin,
    handleSelectDestination,
    handleDateChange,
    handlePassengerCountChange,
    handleClassChange,
    handleSearch,
    updateBookingTypeAndSearch
  } = useFlight();

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
          handleSearch={handleSearch}
        />

        {/* Roundtrip */}
        <Roundtrip
          flightDetails={flightDetails}
          handleSelectOrigin={handleSelectOrigin}
          handleSelectDestination={handleSelectDestination}
          handleDateChange={handleDateChange}
          handlePassengerCountChange={handlePassengerCountChange}
          handleClassChange={handleClassChange}
          updateBookingTypeAndSearch={updateBookingTypeAndSearch}
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
