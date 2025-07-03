import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedScheduleProjectName: "",
  selectedScheduleProject: {},
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
    setSelectedScheduleProject(state, action) {
      state.selectedScheduleProject = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setSelectedScheduleProjectName,
  setSelectedScheduleProject,
} = scheduleSheetSlice.actions;

export default scheduleSheetSlice.reducer;
