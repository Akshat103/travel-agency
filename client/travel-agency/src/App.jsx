import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import loadable from '@loadable/component';

// Dynamically load routes
const ClientRoutes = loadable(() => import('./routes/ClientRoutes'));
const AdminRoutes = loadable(() => import('./routes/AdminRoutes'));

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userType');
  return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loading />}>
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
      </Router>
    </div>
  );
};

export default App;
