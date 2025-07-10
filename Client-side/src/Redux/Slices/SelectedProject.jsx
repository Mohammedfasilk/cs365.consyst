import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: '',
  isOpen: false,
  selectedProjectName: '',
  selectedProjectStatus: '',
  isSaved:false
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
    setSelectedProjectStatus(state, action) {
      state.selectedProjectStatus = action.payload;      
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setIsSaved(state, action) {
      state.isSaved = action.payload;
    },
    clearSelectedProject(state) {
      state.project = '';
    },
  },
});

export const { setSelectedProject, clearSelectedProject,setIsOpen,setSelectedProjectName,setSelectedProjectStatus, setIsSaved } = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;