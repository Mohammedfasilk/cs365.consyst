import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedNoticeId: "",
};

const noticeSheetSlice = createSlice({
  name: 'noticeSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedNoticeId(state, action) {
      state.selectedNoticeId = action.payload;
    },
  },
});

export const { setIsOpen, setSelectedNoticeId } = noticeSheetSlice.actions;
export default noticeSheetSlice.reducer;
