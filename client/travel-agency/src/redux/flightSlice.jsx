import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flightDetails: {
    Origin: { AIRPORTCODE: '', COUNTRYCODE: '' },
    Destination: { AIRPORTCODE: '', COUNTRYCODE: '' },
    TravelDate: '',
    DepartureDate: '',
    Booking_Type: '0',
    Adult_Count: 0,
    Child_Count: 0,
    Infant_Count: 0,
    Class_Of_Travel: '0',
    Travel_Type: ''
  },
  searchResult: null,
  loading: false,
  error: null,
  searchKey: null,
  passengers: [],
};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    updateFlightDetails: (state, action) => {
      state.flightDetails = { ...state.flightDetails, ...action.payload };
    },
    updateSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    updateSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    updatePassengers: (state, action) => {
      state.passengers = action.payload;
    },
    addPassenger: (state, action) => {
      state.passengers.push(action.payload);
    },
    updatePassenger: (state, action) => {
      const { index, data } = action.payload;
      state.passengers[index] = { ...state.passengers[index], ...data };
    },
    removePassenger: (state, action) => {
      state.passengers = state.passengers.filter((_, index) => index !== action.payload);
    },
  },
});

export const {
  updateFlightDetails,
  updateSearchResult,
  updateSearchKey,
  updatePassengers,
  addPassenger,
  updatePassenger,
  removePassenger,
} = flightSlice.actions;

export default flightSlice.reducer;