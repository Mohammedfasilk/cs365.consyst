import { Calendar, Printer } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/UI/Tabs";
import { CalendarGrid } from "../../components/Calendar/CalendarGrid";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCalendar,
  setSelectedCalendarId,
} from "../../Redux/Slices/calendarSheetSlice";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { Button } from "../../components/UI/Button";
import { EventSidebar } from "../../components/Calendar/EventSidebar";
import { useCalendarEvents } from "../../Hooks/useCalendarEvents";

function CalendarView() {
  const dispatch = useDispatch();
  const [calendars, setCalendars] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { getTodayEvents, getTomorrowEvents, getNext7DaysEvents } = useCalendarEvents();
  const selectedCalendarId = useSelector(
    (state) => state.calendarSheet.selectedCalendarId
  );
  const selectedCalendar = useSelector(
    (state) => state.calendarSheet.selectedCalendar
  );
  const { accounts } = useMsal();
  const user = accounts[0]?.name;

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/calendar`
        );
        const allCalendars = res.data;
        const filtered = allCalendars.filter((calendar) =>
          calendar.shared_with?.includes(user)
        );
        setCalendars(filtered);

        if (filtered.length > 0 && !selectedCalendarId) {
          dispatch(setSelectedCalendarId(filtered[0]._id));
        }
      } catch (err) {
        console.error("Failed to fetch calendars:", err);
      }
    };

    fetchCalendars();
  }, [user]);

  const handleTabChange = (calendarId) => {
    dispatch(setSelectedCalendarId(calendarId));
    const calendar = calendars.find((cal) => cal._id === calendarId);
    if (calendar) {
      dispatch(setSelectedCalendar(calendar));
    }
  };
  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 100); // Wait for the DOM to update
  };

  return (
    <div>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-calendar,
          #printable-calendar * {
            visibility: visible;
          }
          #printable-calendar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
        }
      `}</style>

      <div className="mb-16 ml-20 mt-16 mx-8 print:hidden">
        <h1 className="text-2xl font-bold">Calendar</h1>
      </div>

      <Tabs
        value={selectedCalendarId || calendars[0]?._id || ""}
        onValueChange={handleTabChange}
        className="print:hidden"
      >
        <TabsList className="ml-20 mt-16 overflow-auto">
          {calendars.map((calendar) => (
            <TabsTrigger key={calendar._id} value={calendar._id}>
              <Calendar className="mr-2 h-4 w-4" />
              {calendar.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {calendars.map((calendar) => (
          <TabsContent
            key={calendar._id}
            value={calendar._id}
            className="bg-[var(--csgray)]"
          >
            <div className="ml-20 print:hidden mb-4 flex justify-end mx-8">
              <Button onClick={handlePrint} className="px-4 py-2">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
            <div className="mx-8 ml-20 mb-2 flex flex-col md:flex-row gap-2">
              <CalendarGrid
                selectedCalendarId={calendar._id}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />
              <EventSidebar
                todayEvents={getTodayEvents()}
                tomorrowEvents={getTomorrowEvents()}
                next7DaysEvents={getNext7DaysEvents()}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* ✅ Printable calendar section */}
      {selectedCalendarId && (
        <div id="printable-calendar" className="hidden print:block p-4">
          <CalendarGrid
            selectedCalendarId={selectedCalendarId}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarView;
