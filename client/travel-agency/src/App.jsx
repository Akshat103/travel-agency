import { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import Loading from './components/Loading';
import ScrollToTop from './utils/ScrollToTop';
import { resetStore } from './redux/store';
import './App.css';

const ClientRoutes = loadable(() => import('./routes/ClientRoutes'));
const AdminRoutes = loadable(() => import('./routes/AdminRoutes'));

const RESET_ROUTES = {
  '/': true,
  '/success': true,
  '/failure': true,
  '/logout': true,
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userType');
  return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

const RouteWrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (RESET_ROUTES[location.pathname]) {
      const frameId = requestAnimationFrame(() => {
        dispatch(resetStore());
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [location.pathname, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={['0']}>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <RouteWrapper />
  );
};

export default App;
