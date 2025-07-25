import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  isSameDay,
  isToday,
  isTomorrow,
  addDays,
  isWithinInterval,
  startOfDay,
  parseISO,
  getDaysInMonth,
} from 'date-fns';
import { useSelector } from 'react-redux';

export const useCalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const selectedCalendarId = useSelector((state) => state.calendarSheet.selectedCalendarId);
  const selectedCalendar = useSelector((state) => state.calendarSheet.selectedCalendar);

  // 🚀 Fetch events from backend on mount or when calendar changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/calendar/${selectedCalendarId}/events`
        );

        const parsedEvents = res.data?.map((event) => ({
          ...event,
          date: parseISO(event.date), // convert to Date object
        }));

        setEvents(parsedEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    if (selectedCalendarId) {
      fetchEvents();
    }
  }, [selectedCalendarId]);

  // 🧠 Helper to check if a recurring event matches a target date
  const isRecurringMatch = (event, date) => {
    if (!event.recurring || !selectedCalendar) return false;

    const eventDay = event.date.getDate();
    const targetDay = date.getDate();

    // Skip if day doesn't match or date exceeds max days in month (e.g. Feb 30)
    if (
      eventDay !== targetDay ||
      eventDay > getDaysInMonth(date)
    ) {
      return false;
    }

    const eventYear = event.date.getFullYear();
    const eventMonth = event.date.getMonth();

    // Determine recurrence end based on calendar year type
    let recurrenceEnd;

    if (selectedCalendar.year_type === 'CY') {
      recurrenceEnd = new Date(eventYear, 11, 31); // Dec 31
    } else if (selectedCalendar.year_type === 'FY') {
      // Financial Year: end at March 31 of next year if event is after March
      const fyEndYear = eventMonth >= 3 ? eventYear + 1 : eventYear;
      recurrenceEnd = new Date(fyEndYear, 2, 31); // Mar 31
    } else {
      return false; // unknown year_type
    }

    // Ensure date is in valid range
    return date >= event.date && date <= recurrenceEnd;
  };

  // 📅 Filter functions
  const getEventsForDate = (date) => {
    return events.filter(
      (event) => isSameDay(event.date, date) || isRecurringMatch(event, date)
    );
  };

  const getTodayEvents = () => getEventsForDate(new Date());

  const getTomorrowEvents = () => getEventsForDate(addDays(new Date(), 1));

  const getNext7DaysEvents = () => {
    const today = startOfDay(new Date());
    const all = [];

    for (let i = 0; i <= 7; i++) {
      const day = addDays(today, i);
      all.push(...getEventsForDate(day));
    }

    return all;
  };

  return {
    events,
    getEventsForDate,
    getTodayEvents,
    getTomorrowEvents,
    getNext7DaysEvents,
  };
};
