import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const HotelSearch = lazy(() => import('../../client/pages/HotelSearch'));
const HotelDetails = lazy(() => import('../../client/components/hotelpage/HotelDetails'));
const BookHotel = lazy(() => import('../../client/components/hotelpage/BookHotel'));

const HotelRoutes = () => (
  <>
    <Route path="hotel" element={<HotelSearch />} />
    <Route path="hotel-details" element={<HotelDetails />} />
    <Route path="book-hotel" element={<BookHotel />} />
  </>
);

export default HotelRoutes;
