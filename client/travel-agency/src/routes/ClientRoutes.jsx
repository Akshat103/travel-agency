import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClientLayout from '../client/ClientLayout';
import ClientHome from '../client/pages/ClientHome';
import FlightSearch from '../client/pages/FlightSearch';
import BusSearch from '../client/pages/BusSearch';
import RechargePage from '../client/pages/RechargePage';
import FlightDetails from '../client/components/flightpage/FlightDetails';
import BusDetails from '../client/components/buspage/BusDetails';
import SuccessPage from '../pages/SuccessPage';
import HotelSearch from '../client/pages/HotelSearch';
import HotelDetails from '../client/components/hotelpage/HotelDetails';
import BookHotel from '../client/components/hotelpage/BookHotel';
import AddPassengers from '../client/components/flightpage/AddPassengers';
import SeatSelectionPage from '../client/components/flightpage/SeatSelectionPage';
import FailurePage from '../pages/FailurePage';
import Spinner from '../components/Spinner';

const NotFound = lazy(() => import('../pages/NotFound'));
const OnboardUser = lazy(() => import('../client/pages/OnboardUser'));
const IRCTCPage = lazy(() => import('../client/pages/IrctcPage'));
const Register = lazy(() => import('../client/pages/Register'));
const LogIn = lazy(() => import('../client/pages/LogIn'));
const UserDashboard = lazy(() => import('../client/pages/UserDashboard'));
const ContactUs = lazy(() => import('../client/pages/ContactUs'));
const AboutUs = lazy(() => import('../client/pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('../client/pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../client/pages/TermsAndConditions'));
const CancellationRefund = lazy(() => import('../client/pages/CancellationRefund'));
const ShippingDelivery = lazy(() => import('../client/pages/ShippingDelivery'));

const IRCTCRouteGuard = ({ irctcValue, requiredValue, redirectTo, children }) => {
  if (irctcValue !== requiredValue) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

const ClientRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const irctcStatus = localStorage.getItem('irctc');

  const handleAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const userType = urlParams.get('userType');
    const irctc = urlParams.get('irctc');

    if (status === 'success' && userType) {
      localStorage.setItem('userType', userType);
      localStorage.setItem('irctc', irctc);
      toast.success('Login successful!');
      navigate('/');
    }

    const error = urlParams.get('error');
    if (error === 'authentication_failed') {
      toast.error('Google login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (location.pathname === '/auth/callback') {
      handleAuthCallback();
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{ zoom: '80%' }}>
      <Suspense fallback={<Spinner show={true} />}>
        <Routes>
          {/* Home */}
          <Route path="" element={<ClientLayout><ClientHome /></ClientLayout>} />

          {/* Register Page */}
          <Route path="register" element={<ClientLayout><Register /></ClientLayout>} />

          {/* Login Page */}
          <Route path="login" element={<ClientLayout><LogIn /></ClientLayout>} />

          {/* Flight Routes */}
          <Route path="flights" element={<ClientLayout><FlightSearch /></ClientLayout>} />
          <Route path="flight-details" element={<ClientLayout><FlightDetails /></ClientLayout>} />
          <Route path="flight/add-passengers" element={<ClientLayout><AddPassengers /></ClientLayout>} />
          <Route path="flight/seats" element={<ClientLayout><SeatSelectionPage /></ClientLayout>} />

          {/* Bus Routes */}
          <Route path="bus" element={<ClientLayout><BusSearch /></ClientLayout>} />
          <Route path="bus-details" element={<ClientLayout><BusDetails /></ClientLayout>} />

          {/* Hotel Routes */}
          <Route path="hotel" element={<ClientLayout><HotelSearch /></ClientLayout>} />
          <Route path="hotel-details" element={<ClientLayout><HotelDetails /></ClientLayout>} />
          <Route path="book-hotel" element={<ClientLayout><BookHotel /></ClientLayout>} />

          {/* Mobile Recharge Routes */}
          <Route path="mobile-recharge" element={<ClientLayout><RechargePage /></ClientLayout>} />

          {/* User Dashboard */}
          <Route path="dashboard" element={<ClientLayout><UserDashboard /></ClientLayout>} />


          <Route path="success" element={<ClientLayout><SuccessPage /></ClientLayout>} />
          <Route path="failure" element={<ClientLayout><FailurePage /></ClientLayout>} />

          <Route path="contact-us" element={<ClientLayout><ContactUs /></ClientLayout>} />
          <Route path="about-us" element={<ClientLayout><AboutUs /></ClientLayout>} />
          <Route path="privacy-policy" element={<ClientLayout><PrivacyPolicy /></ClientLayout>} />
          <Route path="terms-and-conditions" element={<ClientLayout><TermsAndConditions /></ClientLayout>} />
          <Route path="cancellation-refund" element={<ClientLayout><CancellationRefund /></ClientLayout>} />
          <Route path="shipping-delivery" element={<ClientLayout><ShippingDelivery /></ClientLayout>} />

          {/* IRCTC Routes */}
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

          <Route path="*" element={<ClientLayout><NotFound /></ClientLayout>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default ClientRoutes;
