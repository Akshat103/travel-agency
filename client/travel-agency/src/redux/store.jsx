import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './flightSlice';
import airportReducer from './airportSlice';
import rechargeReducer from './rechargeSlice';
import busReducer from './busSlice';

const store = configureStore({
    reducer: {
        flights: flightReducer,
        airports: airportReducer,
        recharge: rechargeReducer,
        bus: busReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
