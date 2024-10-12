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
import SuccessPage from '../pages/SuccessPage';
import HotelSearch from '../client/pages/HotelSearch';
import HotelDetails from '../client/components/hotelpage/HotelDetails';
import BookHotel from '../client/components/hotelpage/BookHotel.jsx';
import NotFound from '../pages/NotFound';
import UserDashboard from '../client/pages/UserDashboard.jsx';
import BookFlights from '../client/components/flightpage/BookFlights.jsx';
import SeatSelection from '../client/components/flightpage/SeatSelection.jsx';
import Test from '../client/pages/test.jsx';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ClientLayout><ClientHome /></ClientLayout>} />
      <Route path="register" element={<ClientLayout><Register /></ClientLayout>} />
      <Route path="login" element={<ClientLayout><LogIn /></ClientLayout>} />
      <Route path="flights" element={<ClientLayout><FlightSearch /></ClientLayout>} />
      <Route path="flight-details" element={<ClientLayout><FlightDetails /></ClientLayout>} />
      <Route path="book-flight" element={<ClientLayout><BookFlights /></ClientLayout>} />
      <Route path="flight/seats" element={<ClientLayout><SeatSelection /></ClientLayout>} />
      <Route path="bus" element={<ClientLayout><BusSearch /></ClientLayout>} />
      <Route path="hotel" element={<ClientLayout><HotelSearch /></ClientLayout>} />
      <Route path="hotel-details" element={<ClientLayout><HotelDetails /></ClientLayout>} />
      <Route path="book-hotel" element={<ClientLayout><BookHotel /></ClientLayout>} />
      <Route path="bus-details" element={<ClientLayout><BusDetails /></ClientLayout>} />
      <Route path="mobile-recharge" element={<ClientLayout><RechargePage /></ClientLayout>} />
      <Route path="dashboard" element={<ClientLayout><UserDashboard /></ClientLayout>} />
      <Route path="success" element={<ClientLayout><SuccessPage /></ClientLayout>} />
      <Route path="test" element={<Test />} />
      <Route path="*" element={<ClientLayout><NotFound /></ClientLayout>} />
    </Routes>
  );
};

export default ClientRoutes;
