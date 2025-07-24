const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String , required: true },
  category: { type: String },
  recurring: { type: Boolean , default: false },
});

const calendarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year_type: { type: String },
  shared_with: [],
  events: [eventSchema],
});

module.exports = mongoose.model("Calendar", calendarSchema);
