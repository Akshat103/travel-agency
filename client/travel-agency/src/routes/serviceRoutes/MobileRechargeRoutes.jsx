import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const RechargePage = lazy(() => import('../../client/pages/RechargePage'));

const MobileRechargeRoutes = () => (
  <>
    <Route path="mobile-recharge" element={<RechargePage />} />
  </>
);

export default MobileRechargeRoutes;
