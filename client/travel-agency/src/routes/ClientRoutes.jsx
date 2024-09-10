import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../components/client/ClientLayout';
import ClientHome from '../pages/client/ClientHome';
import Register from '../pages/client/Register';
import LogIn from '../pages/client/LogIn';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ClientLayout><ClientHome /></ClientLayout>} />
      <Route path="register" element={<ClientLayout><Register /></ClientLayout>} />
      <Route path="login" element={<ClientLayout><LogIn /></ClientLayout>} />

    </Routes>
  );
};

export default ClientRoutes;
