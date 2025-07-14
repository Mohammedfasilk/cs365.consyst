import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionUser: null ,
  sessionRole:[],
};

const session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionUser(state, action) {
      state.sessionUser = action.payload;
    },
    setSessionRole(state, action) {
      state.sessionRole = action.payload;
    },
  },
});

export const { setSessionUser,setSessionRole } = session.actions;
export default session.reducer;
