import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './flightSlice';
import airportReducer from './airportSlice';
import rechargeReducer from './rechargeSlice';

const store = configureStore({
  reducer: {
    flights: flightReducer,
    airports: airportReducer,
    recharge: rechargeReducer,
  },
});

export default store;
