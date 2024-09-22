import { createSlice } from '@reduxjs/toolkit';

const busSlice = createSlice({
    name: 'bus',
    initialState: {
        source: "",
        destination: "",
        journeyDate: "",
        sourceList: [],
        destinationList: []
    },
    reducers: {
        setSource(state, action) {
            state.source = action.payload;
        },
        setDestination(state, action) {
            state.destination = action.payload;
        },
        setJourneyDate(state, action) {
            state.journeyDate = action.payload;
        },
        setSourceList(state, action) {
            state.sourceList = action.payload;
        },
        setDestinationList(state, action) {
            state.destinationList = action.payload;
        },
    },
});

export const { 
    setSource, 
    setDestination, 
    setJourneyDate, 
    setSourceList,
    setDestinationList
} = busSlice.actions;

export default busSlice.reducer;
