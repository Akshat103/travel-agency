import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

const ClientRoutes = lazy(() => import('./routes/ClientRoutes'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));

const App = () => {
  const [userRole, setUserRole] = useState('client');

  return (
    <div>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/*"
              element={userRole === 'client' ? <ClientRoutes /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/*"
              element={userRole === 'admin' ? <AdminRoutes /> : <Navigate to="/" />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
