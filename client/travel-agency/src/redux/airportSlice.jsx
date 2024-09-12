import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAirports = createAsyncThunk('airports/fetchAirports', async () => {
  const response = await axios.get('/api/flightcity');
  if (response.data.statuscode === '100') {
    return response.data.data;
  }
  throw new Error('Failed to fetch airport data');
});

const airportSlice = createSlice({
  name: 'airports',
  initialState: {
    airports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.airports = action.payload;
        state.loading = false;
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default airportSlice.reducer;
