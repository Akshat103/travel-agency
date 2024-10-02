import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../client/ClientLayout';
import ClientHome from '../client/pages/ClientHome';
import Register from '../client/pages/Register';
import LogIn from '../client/pages/LogIn';
import FlightSearch from '../client/pages/FlightSearch';
import BusSearch from '../client/pages/BusSearch';
import RechargePage from '../client/pages/RechargePage';
import FlightDetails from '../client/components/flightpage/FlightDetails';
import BusDetails from '../client/components/buspage/BusDetails';
import NotFound from '../pages/NotFound';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ClientLayout><ClientHome /></ClientLayout>} />
      <Route path="register" element={<ClientLayout><Register /></ClientLayout>} />
      <Route path="login" element={<ClientLayout><LogIn /></ClientLayout>} />
      <Route path="flights" element={<ClientLayout><FlightSearch /></ClientLayout>} />
      <Route path="flight-details" element={<ClientLayout><FlightDetails /></ClientLayout>} />
      <Route path="bus" element={<ClientLayout><BusSearch /></ClientLayout>} />
      <Route path="bus-details" element={<ClientLayout><BusDetails /></ClientLayout>} />
      <Route path="mobile-recharge" element={<ClientLayout><RechargePage /></ClientLayout>} />
      <Route path="*" element={<ClientLayout><NotFound /></ClientLayout>} />
    </Routes>
  );
};

export default ClientRoutes;
