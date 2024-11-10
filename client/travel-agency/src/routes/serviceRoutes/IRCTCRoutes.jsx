import React, { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';

const OnboardUser = lazy(() => import('../../client/pages/OnboardUser'));
const IRCTCPage = lazy(() => import('../../client/pages/IrctcPage'));

const IRCTCRouteGuard = ({ irctcValue, requiredValue, redirectTo, children }) => {
  if (irctcValue !== requiredValue) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

const IRCTCRoutes = ({ irctcStatus }) => (
  <>
    <Route
      path="irctc/onboard"
      element={
        <IRCTCRouteGuard irctcValue={irctcStatus} requiredValue="0" redirectTo="/irctc">
          <OnboardUser />
        </IRCTCRouteGuard>
      }
    />
    <Route
      path="irctc"
      element={
        <IRCTCRouteGuard irctcValue={irctcStatus} requiredValue="1" redirectTo="/irctc/onboard">
          <IRCTCPage />
        </IRCTCRouteGuard>
      }
    />
  </>
);

export default IRCTCRoutes;
