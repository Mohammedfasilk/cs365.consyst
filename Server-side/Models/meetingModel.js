const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  host: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default:'upcoming'
  },

  attendees: [],

  agenda: [],
});

module.exports = mongoose.model("Meetings", meetingSchema);
