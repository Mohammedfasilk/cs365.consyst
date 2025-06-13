import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedSignatureName: "",
};

const signatureSheetSlice = createSlice({
  name: 'signatureSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedSignatureName(state, action) {
      state.selectedSignatureName = action.payload;
    },
  },
});

export const { setIsOpen, setSelectedSignatureName } = signatureSheetSlice.actions;
export default signatureSheetSlice.reducer;
