import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/settings`, {
      headers: { 'Cache-Control': 'no-store' }
    });
    return response.data;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: {},
  },
  reducers: {
    setSettings(state, action) {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;