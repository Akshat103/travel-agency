import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flightReducer from './flightSlice';
import airportReducer from './airportSlice';
import rechargeReducer from './rechargeSlice';
import busReducer from './busSlice';
import hotelReducer from './hotelSlice';

const appReducer = combineReducers({
    flights: flightReducer,
    airports: airportReducer,
    recharge: rechargeReducer,
    bus: busReducer,
    hotel: hotelReducer,
});

// Root reducer with reset functionality
const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
};

// Configure store with middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Action creator for resetting store
export const resetStore = () => ({ type: 'RESET_STORE' });

export default store;
