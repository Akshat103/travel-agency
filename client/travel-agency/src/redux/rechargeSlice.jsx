import { createSlice } from '@reduxjs/toolkit';

const rechargeSlice = createSlice({
  name: 'recharge',
  initialState: {
    number: '',
    operator: '',
    circle: '',
    operators: [],
    circles: [],
    dataFetched: false,
  },
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
    },
    setOperator(state, action) {
      state.operator = action.payload;
    },
    setCircle(state, action) {
      state.circle = action.payload;
    },
    setOperators(state, action) {
      state.operators = action.payload;
    },
    setCircles(state, action) {
      state.circles = action.payload;
    },
    setDataFetched(state, action) {
      state.dataFetched = action.payload;
    },
  },
});

export const {
  setNumber,
  setOperator,
  setCircle,
  setOperators,
  setCircles,
  setDataFetched,
} = rechargeSlice.actions;

export default rechargeSlice.reducer;
