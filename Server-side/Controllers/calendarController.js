const Calendar = require("../Models/CalendarModel");

exports.createOrUpdateCalendar = async (req, res) => {
  try {
    const { id, title, year_type, shared_with } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (id) {
      // Update existing calendar
      const calendar = await Calendar.findById(id);
      if (!calendar) {
        return res.status(404).json({ error: "Calendar not found" });
      }

      calendar.title = title;
      calendar.year_type = year_type;
      calendar.shared_with = shared_with;

      await calendar.save();
      return res.status(200).json({ message: "Calendar updated", data: calendar });
    } else {
      // Create new calendar
      const newCalendar = new Calendar({
        title,
        year_type,
        shared_with,
      });

      await newCalendar.save();
      return res.status(201).json({ message: "Calendar created", data: newCalendar });
    }
  } catch (err) {
    console.error("Error in createOrUpdateCalendar:", err);
    res.status(500).json({ error: "Failed to create or update calendar" });
  }
};

exports.createOrUpdateEvent = async (req, res) => {
  try {
    const { calendarId, eventId, title, date, category, recurring } = req.body;

    if (!calendarId) {
      return res.status(400).json({ error: "Calendar ID is required" });
    }

    if (!title || !date) {
      return res.status(400).json({ error: "Title and Date are required" });
    }

    const calendar = await Calendar.findById(calendarId);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    if (eventId) {
      // Update existing event
      const event = calendar.events.id(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found in calendar" });
      }

      event.title = title;
      event.date = date;
      event.category = category;
      event.recurring = recurring;
    } else {
      // Add new event
      calendar.events.push({
        title,
        date,
        category,
        recurring,
      });
    }

    await calendar.save();
    return res.status(200).json({ message: eventId ? "Event updated" : "Event created", data: calendar });
  } catch (err) {
    console.error("Error in createOrUpdateEvent:", err);
    res.status(500).json({ error: "Failed to create or update event" });
  }
};
