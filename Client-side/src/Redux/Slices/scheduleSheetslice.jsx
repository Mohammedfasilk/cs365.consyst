import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedScheduleProjectName: '',
  selectedMonth: null,
  selectedSchedule: ''
};

const scheduleSheetSlice = createSlice({
  name: 'scheduleSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedScheduleProjectName(state, action) {
      state.selectedScheduleProjectName = action.payload;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setSelectedSchedule(state, action) {
      state.selectedSchedule = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setSelectedScheduleProjectName,
  setSelectedMonth,
  setSelectedSchedule,
} = scheduleSheetSlice.actions;

export default scheduleSheetSlice.reducer;
