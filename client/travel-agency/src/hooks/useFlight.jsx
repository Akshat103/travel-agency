import { useCallback, useEffect, useRef, useState } from 'react';
import { apiHandler } from '../utils/apiHandler';

export const useFlight = () => {
  const [flightDetails, setFlightDetails] = useState({
    Origin: { AIRPORTCODE: '', COUNTRYCODE: '' },
    Destination: { AIRPORTCODE: '', COUNTRYCODE: '' },
    TravelDate: '',
    DepartureDate: '',
    Booking_Type: '0',
    Adult_Count: 0,
    Child_Count: 0,
    Infant_Count: 0,
    Class_Of_Travel: '0',
  });

  const flightDetailsRef = useRef(flightDetails);

  useEffect(() => {
    flightDetailsRef.current = flightDetails;
  }, [flightDetails]);

  const isValidFlightDetails = (details) => {
    return (
      details.Origin.AIRPORTCODE && 
      details.Origin.COUNTRYCODE &&
      details.Destination.AIRPORTCODE &&
      details.Destination.COUNTRYCODE &&
      details.TravelDate &&
      details.Adult_Count >= 0 &&
      details.Child_Count >= 0
    );
  };

  const handleSearch = useCallback(async () => {
    const currentFlightDetails = flightDetailsRef.current;
    if (!isValidFlightDetails(currentFlightDetails)) {
      return;
    }
    try {
      const data = await apiHandler('post', '/flightsearch', { requestdata: currentFlightDetails });
      return data.data[0];
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  }, []);

  const updateFlightDetails = useCallback((updater) => {
    setFlightDetails(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : updater;
      return { ...prev, ...updated };
    });
  }, []);

  const handleSelectOrigin = useCallback((airport) => {
    updateFlightDetails({
      Origin: {
        AIRPORTCODE: airport.AIRPORTCODE,
        COUNTRYCODE: airport.COUNTRYCODE,
      },
    });
  }, [updateFlightDetails]);

  const handleSelectDestination = useCallback((airport) => {
    updateFlightDetails({
      Destination: {
        AIRPORTCODE: airport.AIRPORTCODE,
        COUNTRYCODE: airport.COUNTRYCODE,
      },
    });
  }, [updateFlightDetails]);

  const handleDateChange = useCallback((startDate, endDate) => {
    updateFlightDetails({
      TravelDate: startDate,
      DepartureDate: endDate,
    });
  }, [updateFlightDetails]);

  const handlePassengerCountChange = useCallback((type, change) => {
    updateFlightDetails(prev => ({
      [`${type}_Count`]: Math.max(0, prev[`${type}_Count`] + change),
    }));
  }, [updateFlightDetails]);

  const handleClassChange = useCallback((newClass) => {
    updateFlightDetails({ Class_Of_Travel: newClass });
  }, [updateFlightDetails]);

  const handleBookingTypeChange = useCallback((newBookingType) => {
    updateFlightDetails({ Booking_Type: newBookingType.toString() });
  }, [updateFlightDetails]);

  return {
    flightDetails,
    handleSelectOrigin,
    handleSelectDestination,
    handleDateChange,
    handlePassengerCountChange,
    handleClassChange,
    handleSearch,
    handleBookingTypeChange,
  };
};
