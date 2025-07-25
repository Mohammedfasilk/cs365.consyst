const express = require("express");
const { createOrUpdateCalendar, createOrUpdateEvent, getEventsByCalendar, getAllCalendars } = require("../Controllers/calendarController");
const router = express.Router();

router.post("/create", createOrUpdateCalendar);
router.post("/create-event", createOrUpdateEvent);
router.get("/:calendarId/events", getEventsByCalendar);
router.get("/", getAllCalendars);

module.exports = router;
