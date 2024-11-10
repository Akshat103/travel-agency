import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const BusSearch = lazy(() => import('../../client/pages/BusSearch'));
const BusDetails = lazy(() => import('../../client/components/buspage/BusDetails'));

const BusRoutes = () => (
  <>
    <Route path="bus" element={<BusSearch />} />
    <Route path="bus-details" element={<BusDetails />} />
  </>
);

export default BusRoutes;
