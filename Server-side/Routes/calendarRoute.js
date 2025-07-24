const express = require("express");
const { createOrUpdateCalendar, createOrUpdateEvent } = require("../Controllers/calendarController");
const router = express.Router();

router.post("/create", createOrUpdateCalendar);
router.post("/create-event", createOrUpdateEvent);

module.exports = router;
