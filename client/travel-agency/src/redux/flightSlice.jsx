import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchFlights = createAsyncThunk(
  'flights/searchFlights',
  async (flightDetails, { rejectWithValue }) => {
    
    const requiredFields = [
      'Origin.AIRPORTCODE', 
      'Origin.COUNTRYCODE', 
      'Destination.AIRPORTCODE', 
      'Destination.COUNTRYCODE', 
      'TravelDate', 
      'Booking_Type', 
      'Adult_Count', 
      'Class_Of_Travel'
    ];
    
    const checkField = (obj, fieldPath) => fieldPath.split('.').reduce((o, key) => (o !== undefined && o[key] !== undefined) ? o[key] : null, obj);
    
    for (const field of requiredFields) {
      const fieldValue = checkField(flightDetails, field);
      if (fieldValue === null || fieldValue === '') {
        return;
      }
    }

    try {
      const response = await axios.post('/api/flightsearch', { requestdata: flightDetails });
      return response.data.data[0].Flights;
    } catch (error) {
      return rejectWithValue('Error searching flights');
    }
  }
);



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
};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    updateFlightDetails: (state, action) => {
      state.flightDetails = { ...state.flightDetails, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFlightDetails } = flightSlice.actions;

export default flightSlice.reducer;
