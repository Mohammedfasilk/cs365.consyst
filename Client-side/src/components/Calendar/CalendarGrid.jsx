// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
// import { format } from 'date-fns';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { useCalendarEvents } from '@/hooks/useCalendarEvents';
// import { useHolidays } from '@/hooks/useHolidays';
// import { cn } from '@/lib/utils';

import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../UI/Button";
import { Card } from "../UI/Card";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { useCalendarEvents } from "../../Hooks/useCalendarEvents";

export function CalendarGrid({
  selectedDate,
  onDateSelect,
  currentMonth,
  setCurrentMonth,
}) {
  const { getEventsForDate } = useCalendarEvents();
  const { getHolidaysForDate } = "";
  //   useHolidays();

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Calculate the calendar grid
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfCalendar = new Date(firstDayOfMonth);
  firstDayOfCalendar.setDate(
    firstDayOfCalendar.getDate() - firstDayOfCalendar.getDay()
  );

  const daysInCalendar = [];
  const currentDay = new Date(firstDayOfCalendar);

  for (let i = 0; i < 42; i++) {
    daysInCalendar.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <Card className="w-full bg-white" id="calendar-view">
      {/* Header */}
      <div className="p-6 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              className="hover:bg-green-600 hover:text-white border-gray-300"
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              className="hover:bg-green-600 hover:text-white border-gray-300"
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
            >
              Today
            </Button>
            <Button
              className="hover:bg-green-600 hover:text-white border-gray-300"
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6" id="calendar-grid">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-[var(--muted-foreground)] border-b border-gray-300"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {daysInCalendar.map((day, index) => {
            const events = getEventsForDate(day);

            const holidays = [];
            // getHolidaysForDate(day);
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isDayToday = day.toDateString() === today.toDateString();
            const isDayWeekend = day.getDay() === 0 || day.getDay() === 6;
            const hasHoliday = holidays.length > 0;

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] p-2 border border-gray-300 cursor-pointer transition-colors hover:bg-[var(--primary)]/8",
                  !isCurrentMonth &&
                    "text-[var(--muted-foreground)]/50 bg-[var(--muted-foreground)]/2",
                  isDayToday && "bg-blue-500/20 border-blue-700",
                  isDayWeekend && isCurrentMonth && "bg-[var(--secondary)]/25",
                  hasHoliday && isCurrentMonth && "bg-[var(--accent)]/20"
                )}
                onClick={() => onDateSelect(day)}
              >
                <div className="font-medium text-sm mb-1">{day.getDate()}</div>
                <div className="space-y-1">
                  {/* Display holidays first */}
                  {holidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="text-xs p-1 rounded bg-calendar-holiday/30 text-calendar-holiday border border-calendar-holiday/50 truncate font-medium"
                      title={holiday.name}
                    >
                      {holiday.name}
                    </div>
                  ))}

                  {/* Display events */}
                  {events?.slice(0, hasHoliday ? 2 : 3).map((event) => {
                    const categoryColors = {
                      Strict: "bg-red-300/20 text-red-500 border-red-500/30",
                      Flexible:
                        "bg-blue-300/20 text-blue-500 border-blue-500/30",
                    };

                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs font-semibold p-1 rounded border truncate",
                          categoryColors[event.category]
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    );
                  })}

                  {events.length + holidays.length > (hasHoliday ? 3 : 3) && (
                    <div className="text-xs text-muted-foreground">
                      +{events.length + holidays.length - (hasHoliday ? 3 : 3)}{" "}
                      more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
