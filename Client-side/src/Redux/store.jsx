import { configureStore } from '@reduxjs/toolkit';
import projectSheetReducer from './Slices/projectSheetSlice';
import usersReducer from './Slices/usersSlice';
import settingsReducer from './Slices/settingsSlice';
import signatureSheetReducer from './Slices/signatureSheetSlice';
import selectedProject from './Slices/SelectedProject';
import selectedSalesOrder from './Slices/orderBookingSlice';
import costControlSheetReducer from './Slices/costControlsheet';
import scheduleSheetReducer from './Slices/scheduleSheetslice';
import sessionReducer from './Slices/sessionSlice';

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

    //order-booking
    selectedSalesOrder: selectedSalesOrder,

    //Cost Control
    costControlSheet: costControlSheetReducer,

    //Schedule
    scheduleSheet: scheduleSheetReducer,

    session : sessionReducer,
  },
});

export default store;
