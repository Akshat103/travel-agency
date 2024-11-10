// src/routes/ClientRoutes.js
import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClientHome from '../client/pages/ClientHome';
import ClientHeader from '../client/components/ClientHeader';
import Spinner from '../components/Spinner';
import FlightRoutes from './serviceRoutes/FlightRoutes';
import BusRoutes from './serviceRoutes/BusRoutes';
import HotelRoutes from './serviceRoutes/HotelRoutes';
import MobileRechargeRoutes from './serviceRoutes/MobileRechargeRoutes';
import InfoRoutes from './serviceRoutes/InfoRoutes';
import IRCTCRoutes from './serviceRoutes/IRCTCRoutes';

const NotFound = lazy(() => import('../pages/NotFound'));
const Register = lazy(() => import('../client/pages/Register'));
const LogIn = lazy(() => import('../client/pages/LogIn'));
const ForgotPassword = lazy(() => import('../client/pages/ForgetPasswordPage'));
const UserDashboard = lazy(() => import('../client/pages/UserDashboard'));

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
      <div className="client-layout">
        <ClientHeader />
        <main className="client-main-content">
          <Suspense fallback={<Spinner show={true} />}>
            <Routes>
              <Route path="" element={<ClientHome />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<LogIn />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="dashboard" element={<UserDashboard />} />

              {/* Include the modular routes */}
              {FlightRoutes()}
              {BusRoutes()}
              {HotelRoutes()}
              {MobileRechargeRoutes()}
              {InfoRoutes()}
              {IRCTCRoutes({ irctcStatus })}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default ClientRoutes;
