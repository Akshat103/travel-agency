import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const SuccessPage = lazy(() => import('../../pages/SuccessPage'));
const FailurePage = lazy(() => import('../../pages/FailurePage'));
const ContactUs = lazy(() => import('../../client/pages/ContactUs'));
const AboutUs = lazy(() => import('../../client/pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('../../client/pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../../client/pages/TermsAndConditions'));
const CancellationRefund = lazy(() => import('../../client/pages/CancellationRefund'));
const ShippingDelivery = lazy(() => import('../../client/pages/ShippingDelivery'));

const InfoRoutes = () => (
  <>
    <Route path="success" element={<SuccessPage />} />
    <Route path="failure" element={<FailurePage />} />
    <Route path="contact-us" element={<ContactUs />} />
    <Route path="about-us" element={<AboutUs />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="cancellation-refund" element={<CancellationRefund />} />
    <Route path="shipping-delivery" element={<ShippingDelivery />} />
  </>
);

export default InfoRoutes;
