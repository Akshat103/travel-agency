import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import AddPassengers from '../client/components/flightpage/AddPassengers.jsx';
import SeatSelectionPage from '../client/components/flightpage/SeatSelectionPage.jsx';
import Test from '../client/pages/test.jsx';
import FailurePage from '../pages/FailurePage.jsx';
import ContactUs from '../client/pages/ContactUs.jsx';
import AboutUs from '../client/pages/AboutUs.jsx';
import OnboardUser from '../client/pages/OnboardUser';
import IRCTCPage from '../client/pages/IrctcPage.jsx';

const IRCTCRouteGuard = ({ irctcValue, requiredValue, redirectTo, children }) => {
  if (irctcValue !== requiredValue) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

const ClientRoutes = () => {
  const irctcStatus = localStorage.getItem('irctc');
  return (
    <div style={{ zoom: '85%' }}>
      <Routes>
        <Route path="" element={<ClientLayout><ClientHome /></ClientLayout>} />
        <Route path="register" element={<ClientLayout><Register /></ClientLayout>} />
        <Route path="login" element={<ClientLayout><LogIn /></ClientLayout>} />
        <Route path="flights" element={<ClientLayout><FlightSearch /></ClientLayout>} />
        <Route path="flight-details" element={<ClientLayout><FlightDetails /></ClientLayout>} />
        <Route path="flight/add-passengers" element={<ClientLayout><AddPassengers /></ClientLayout>} />
        <Route path="flight/seats" element={<ClientLayout><SeatSelectionPage /></ClientLayout>} />
        <Route path="bus" element={<ClientLayout><BusSearch /></ClientLayout>} />
        <Route path="hotel" element={<ClientLayout><HotelSearch /></ClientLayout>} />
        <Route path="hotel-details" element={<ClientLayout><HotelDetails /></ClientLayout>} />
        <Route path="book-hotel" element={<ClientLayout><BookHotel /></ClientLayout>} />
        <Route path="bus-details" element={<ClientLayout><BusDetails /></ClientLayout>} />
        <Route path="mobile-recharge" element={<ClientLayout><RechargePage /></ClientLayout>} />
        <Route path="dashboard" element={<ClientLayout><UserDashboard /></ClientLayout>} />
        <Route path="success" element={<ClientLayout><SuccessPage /></ClientLayout>} />
        <Route path="failure" element={<ClientLayout><FailurePage /></ClientLayout>} />
        <Route path="contact-us" element={<ClientLayout><ContactUs /></ClientLayout>} />
        <Route path="about-us" element={<ClientLayout><AboutUs /></ClientLayout>} />
        <Route
          path="irctc/onboard"
          element={
            <ClientLayout>
              <IRCTCRouteGuard irctcValue={irctcStatus} requiredValue="0" redirectTo="/irctc">
                <OnboardUser />
              </IRCTCRouteGuard>
            </ClientLayout>
          }
        />

        <Route
          path="irctc"
          element={
            <ClientLayout>
              <IRCTCRouteGuard irctcValue={irctcStatus} requiredValue="1" redirectTo="/irctc/onboard">
                <IRCTCPage />
              </IRCTCRouteGuard>
            </ClientLayout>
          }
        />

        <Route path="test" element={<Test />} />
        <Route path="*" element={<ClientLayout><NotFound /></ClientLayout>} />
      </Routes>
    </div>
  );
};

export default ClientRoutes;
