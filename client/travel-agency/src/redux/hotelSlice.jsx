import { createSlice } from '@reduxjs/toolkit';

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    formData: {
      fullName: '',
      CheckInDate: '',
      CheckOutDate: '',
      RoomCount: 1,
      HotelRoomDetail: [
        { AdultCount: 1, ChildCount: 0, ChildAges: [] },
      ],
    },
    hotelData: [],
  },
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setHotelData(state, action) {
      state.hotelData = action.payload;
    },
    updateFormField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    addRoom(state) {
      state.formData.RoomCount += 1;
      state.formData.HotelRoomDetail.push({ AdultCount: 1, ChildCount: 0, ChildAges: [] });
    },
    removeRoom(state) {
      if (state.formData.RoomCount > 1) {
        state.formData.RoomCount -= 1;
        state.formData.HotelRoomDetail.pop();
      }
    },
    updateRoomDetail(state, action) {
      state.formData.HotelRoomDetail = action.payload;
    },
  },
});

export const { setFormData, setHotelData, updateFormField, addRoom, removeRoom, updateRoomDetail } = hotelSlice.actions;

export default hotelSlice.reducer;
