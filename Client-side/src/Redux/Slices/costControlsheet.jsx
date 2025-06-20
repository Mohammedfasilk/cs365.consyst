import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedProjectName: "",
  selectedMonth: "",
  choosenProject: "",
  saved: false,
};

const costControlSlice = createSlice({
  name: 'CostControlSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedProjectName(state, action) {
      state.selectedProjectName = action.payload;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setChoosenProject(state, action) {
      state.choosenProject = action.payload;
    },
    setSaved(state, action) {
      state.saved = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setSalesOrder,
  setSelectedProjectName,
  setSelectedMonth,
  setChoosenProject,
  setSaved,
} = costControlSlice.actions;

export default costControlSlice.reducer;
