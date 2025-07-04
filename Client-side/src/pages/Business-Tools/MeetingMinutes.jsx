import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { loginRequest } from "../../utils/authConfig";

function MeetingMinutes() {
  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    agenda: "",
    attendees: "",
    agreements: "",
    date: "",
  });

  const dialogRef = useRef();
  const { instance, accounts } = useMsal();

  const openModal = (data = {}) => {
    setForm({
      id: data.id || null,
      title: data.title || "",
      agenda: data.agenda || "",
      attendees: data.attendees || "",
      agreements: data.agreements || "",
      date: data.date || "",
    });
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  };

  const handleDateClick = (arg) => {
    openModal({ date: arg.dateStr });
  };

  const handleEventClick = (arg) => {
    const selected = meetings.find((m) => m.id === arg.event.id);
    if (selected) openModal(selected);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveMeeting = async () => {
    if (!form.title || !form.date) return alert("Title and date required");

    const newMeeting = { ...form };
    let updatedMeetings;

    if (form.id) {
      updatedMeetings = meetings.map((m) =>
        m.id === form.id ? newMeeting : m
      );
    } else {
      newMeeting.id = uuidv4();
      updatedMeetings = [...meetings, newMeeting];

      try {
        const result = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });

        await axios.post(
          "https://graph.microsoft.com/v1.0/me/todo/lists/tasks/tasks",
          {
            title: newMeeting.agreements || newMeeting.title,
          },
          {
            headers: {
              Authorization: `Bearer ${result.accessToken}`,
            },
          }
        );
        alert("Meeting & Agreement saved to Microsoft To Do!");
      } catch (err) {
        console.error("MS To Do sync failed", err);
      }
    }

    setMeetings(updatedMeetings);
    closeModal();
  };

  const deleteMeeting = () => {
    if (!form.id) return;
    setMeetings(meetings.filter((m) => m.id !== form.id));
    closeModal();
  };

  return (
    <div className="p-10 m-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Meeting Scheduler</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={meetings.map((m) => ({
          id: m.id,
          title: m.title,
          date: m.date,
        }))}
        height="auto"
      />

      {/* Modal */}
      <dialog ref={dialogRef} className="rounded-lg p-6 w-full max-w-xl backdrop:bg-black/30">
        <form method="dialog" className="space-y-4">
          <h2 className="text-xl font-semibold">Schedule / Edit Meeting</h2>
          <input
            className="w-full border p-2 rounded"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Meeting Title"
          />
          <textarea
            className="w-full border p-2 rounded"
            name="agenda"
            value={form.agenda}
            onChange={handleChange}
            placeholder="Agenda"
          />
          <input
            className="w-full border p-2 rounded"
            name="attendees"
            value={form.attendees}
            onChange={handleChange}
            placeholder="Attendees"
          />
          <input
            className="w-full border p-2 rounded"
            name="agreements"
            value={form.agreements}
            onChange={handleChange}
            placeholder="Agreements / Decisions"
          />
          <input
            className="w-full border p-2 rounded"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={saveMeeting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {form.id ? "Update" : "Create"}
            </button>

            {form.id && (
              <button
                type="button"
                onClick={deleteMeeting}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default MeetingMinutes;



