// Server-side/controllers/meetingController.js

const { default: mongoose } = require("mongoose");
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
    const { attendee } = req.body;

    if (!attendee) {
      return res.status(400).json({ error: "Please provide a host name or attendee email." });
    }

    const filter = [];
    if (attendee) filter.push({ "attendees.email": attendee }); // 👈 fixed line

    const meetings = await Meeting.find({ $or: filter });

    if (meetings.length === 0) {
      return res.status(404).json({ message: "No meetings found for the given host or attendee." });
    }

    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Get a single meeting by ID

exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.body;    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid meeting ID' });
    }

    const meeting = await Meeting.findById(id);
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

exports.agendaHandler = async (req, res) => {
  const { meetingId, action, item, newItem, index } = req.body;

  if (!meetingId || !action) {
    return res.status(400).json({ error: "Meeting ID and action are required." });
  }

  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    switch (action) {
      case "add":
        if (!item) return res.status(400).json({ error: "Item is required for adding." });
        meeting.agenda.push(item);
        break;

      case "edit":
        if (index === undefined || !newItem)
          return res.status(400).json({ error: "Index and newItem are required for editing." });
        if (index < 0 || index >= meeting.agenda.length)
          return res.status(400).json({ error: "Invalid agenda index." });
        meeting.agenda[index] = newItem;
        break;

      case "delete":
        if (index === undefined)
          return res.status(400).json({ error: "Index is required for deleting." });
        if (index < 0 || index >= meeting.agenda.length)
          return res.status(400).json({ error: "Invalid agenda index." });
        meeting.agenda.splice(index, 1);
        break;

      default:
        return res.status(400).json({ error: "Invalid action." });
    }

    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrUpdateAgreement = async (req, res) => {
  try {
    const { id, agreement } = req.body;

    if (!id || !agreement) {
      return res.status(400).json({ error: "Meeting ID and assignment data are required." });
    }
    
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    meeting.agreement.push(agreement);
    await meeting.save();

    res.status(200).json({
      message: "Assignment added to meeting successfully.",
      meeting,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

