import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload;
    },
  },
});

export const { setUserList } = usersSlice.actions;
export default usersSlice.reducer;
