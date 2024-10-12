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
  },
  searchResult: null,
  loading: false,
  error: null,
  searchKey:null
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
  },
});

export const { updateFlightDetails, updateSearchResult, updateSearchKey } = flightSlice.actions;

export default flightSlice.reducer;
