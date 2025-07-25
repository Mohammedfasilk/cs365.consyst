import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedCalendarId: null,
  selectedCalendar: null,
  selectedEventId: null,
};

const calendarSheet = createSlice({
  name: 'CalendarSheet',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setSelectedCalendar(state, action) {
        state.selectedCalendar = action.payload
    },
    setSelectedCalendarId(state, action) {
      state.selectedCalendarId = action.payload;
    },
    setSelectedEventId(state, action) {
      state.selectedEventId = action.payload;
    },
  },
});

export const { setIsOpen, setSelectedCalendar ,setSelectedCalendarId , setSelectedEventId } = calendarSheet.actions;
export default calendarSheet.reducer;
