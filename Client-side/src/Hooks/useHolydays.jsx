import { useState } from 'react';
import { Holiday } from '@/types/calendar';

const defaultHolidays = [
  {
    id: '1',
    name: 'New Year\'s Day',
    date: new Date('2024-01-01'),
    isRecurring: true,
    recurringType: 'yearly',
  },
  {
    id: '2',
    name: 'Independence Day',
    date: new Date('2024-07-04'),
    isRecurring: true,
    recurringType: 'yearly',
  },
  {
    id: '3',
    name: 'Christmas Day',
    date: new Date('2024-12-25'),
    isRecurring: true,
    recurringType: 'yearly',
  },
];

export function useHolidays() {
  const [holidays, setHolidays] = useState(defaultHolidays);



  const getHolidaysForDate = (date) => {
    return holidays.filter(holiday => {
      if (!holiday.isRecurring) {
        return holiday.date.toDateString() === date.toDateString();
      }

      if (holiday.recurringType === 'yearly') {
        return holiday.date.getMonth() === date.getMonth() && 
               holiday.date.getDate() === date.getDate();
      }

      if (holiday.recurringType === 'monthly') {
        return holiday.date.getDate() === date.getDate();
      }

      return false;
    });
  };

  return {
    holidays,
    getHolidaysForDate,
  };
}