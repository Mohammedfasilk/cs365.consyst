import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  salesOrder: {},
  selectedProjectName: "",
  selectedProject: {},
};

const projectSheetSlice = createSlice({
  name: 'projectSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSalesOrder(state, action) {
      state.salesOrder = action.payload;
    },
    setSelectedProjectName(state, action) {
      state.selectedProjectName = action.payload;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setSalesOrder,
  setSelectedProjectName,
  setSelectedProject,
} = projectSheetSlice.actions;

export default projectSheetSlice.reducer;
