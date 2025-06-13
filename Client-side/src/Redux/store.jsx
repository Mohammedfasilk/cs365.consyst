import { configureStore } from '@reduxjs/toolkit';
import projectSheetReducer from './Slices/projectSheetSlice';
import usersReducer from './Slices/usersSlice';
import settingsReducer from './Slices/settingsSlice';
import signatureSheetReducer from './Slices/signatureSheetSlice';
import selectedProject from './Slices/SelectedProject';

const store = configureStore({
  reducer: {    

    //settings
    users: usersReducer,
    settings: settingsReducer,

    //Signatures
    signatureSheet: signatureSheetReducer,

    //project-management
    projectSheet: projectSheetReducer,
    selectedProject: selectedProject,
  },
});

export default store;
