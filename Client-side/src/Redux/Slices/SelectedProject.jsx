import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: '',
  isOpen: false,
  selectedProjectName: ''
};

const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.project = action.payload;      
    },
    setSelectedProjectName(state, action) {
      state.selectedProjectName = action.payload;      
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    clearSelectedProject(state) {
      state.project = '';
    },
  },
});

export const { setSelectedProject, clearSelectedProject,setIsOpen,setSelectedProjectName } = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;