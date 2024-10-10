import { createSlice } from '@reduxjs/toolkit';

const busSlice = createSlice({
    name: 'bus',
    initialState: {
        source: "",
        sourceName: "",
        destination: "",
        destinationName: "",
        journeyDate: "",
        sourceList: [],
        destinationList: []
    },
    reducers: {
        setSource(state, action) {
            state.source = action.payload;
        },
        setSourceName(state, action) {
            state.sourceName = action.payload;
        },
        setDestination(state, action) {
            state.destination = action.payload;
        },
        setDestinationName(state, action) {
            state.destinationName = action.payload;
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
    setSourceName, 
    setDestination, 
    setDestinationName, 
    setJourneyDate, 
    setSourceList,
    setDestinationList
} = busSlice.actions;

export default busSlice.reducer;
