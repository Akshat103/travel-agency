import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const FlightSearch = lazy(() => import('../../client/pages/FlightSearch'));
const FlightDetails = lazy(() => import('../../client/components/flightpage/FlightDetails'));
const AddPassengers = lazy(() => import('../../client/components/flightpage/AddPassengers'));
const SeatSelectionPage = lazy(() => import('../../client/components/flightpage/SeatSelectionPage'));

const FlightRoutes = () => (
  <>
    <Route path="flights" element={<FlightSearch />} />
    <Route path="flight-details" element={<FlightDetails />} />
    <Route path="flight/add-passengers" element={<AddPassengers />} />
    <Route path="flight/seats" element={<SeatSelectionPage />} />
  </>
);

export default FlightRoutes;
