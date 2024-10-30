// flightSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  fare: null,
  segments: [],
  flightCity: null,
  flightCityLoading: false,
  flightCityError: null,
  searchResult: null,
  loading: false,
  error: null,
  searchKey: null,
  passengers: [],
};

export const fetchFlightCity = createAsyncThunk(
  'flights/fetchFlightCity',
  async (_, { getState }) => {
    const { flights } = getState();
    if (flights.flightCity) {
      return flights.flightCity;
    }

    const response = await axios.get('/api/flightcity');
    if (response.data.statuscode !== '100') {
      throw new Error('Failed to fetch flight city data');
    }
    return response.data.data;
  },
  {
    condition: (_, { getState }) => {
      const { flights } = getState();
      return !flights.flightCityLoading;
    },
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    updateFlightDetails: (state, action) => {
      state.flightDetails = { ...state.flightDetails, ...action.payload };
    },
    updateFare: (state, action) => {
      state.fare = action.payload;
    },
    updateSegments: (state, action) => {
      state.segments = action.payload;
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
      if (state.passengers[index]) {
        state.passengers[index] = {
          ...state.passengers[index],
          ...data,
        };
      }
    },
    removePassenger: (state, action) => {
      state.passengers = state.passengers.filter((_, index) => index !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightCity.pending, (state) => {
        state.flightCityLoading = true;
        state.flightCityError = null;
      })
      .addCase(fetchFlightCity.fulfilled, (state, action) => {
        state.flightCityLoading = false;
        state.flightCity = action.payload;
      })
      .addCase(fetchFlightCity.rejected, (state, action) => {
        state.flightCityLoading = false;
        state.flightCityError = action.error.message;
      });
  },
});

export const {
  updateFlightDetails,
  updateSearchResult,
  updateFare,
  updateSegments,
  updateSearchKey,
  updatePassengers,
  addPassenger,
  updatePassenger,
  removePassenger,
} = flightSlice.actions;

export default flightSlice.reducer;