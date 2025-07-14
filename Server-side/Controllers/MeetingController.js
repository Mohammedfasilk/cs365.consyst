// Server-side/controllers/meetingController.js

const Meeting = require("../Models/meetingModel");

// Create or update a meeting (by _id if provided, otherwise create new)
exports.createMeeting = async (req, res) => {
  try {
    const meetingData = req.body;

    // Update existing meeting
    const meeting = await Meeting.findOneAndUpdate(
      { title: meetingData?.title },
      meetingData,
      { new: true }
    );

    if (!meeting) {
      // Create new meeting
      let newMeeting = new Meeting(meetingData);

      await newMeeting.save();      
      return res.status(200).json(newMeeting);
    }
    
    return res.status(200).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all meetings, with optional filtering by host or attendee (using req.body)
exports.getMeetings = async (req, res) => {
  try {
    const { host } = req.body; // or req.query if using GET

    if (!host) {
      return res.status(400).json({ error: "Host is required." });
    }

    const filter = { host };

    const meetings = await Meeting.find(filter);
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.body.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });
    res.json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });
    res.json({ message: "Meeting deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
