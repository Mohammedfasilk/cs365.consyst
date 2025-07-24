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
    const { attendee, search } = req.body;

    if (!attendee) {
      return res.status(400).json({ error: "Attendee email is required." });
    }

    // Build base query: attendee match
    const baseQuery = { "attendees.email": attendee };

    // Optional search filtering
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      const searchConditions = {
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { location: { $regex: searchRegex } }, // optional field
        ],
      };

      // Combine attendee + search
      const meetings = await Meeting.find({
        $and: [baseQuery, searchConditions],
      });

      return res.status(200).json(meetings);
    }

    // No search, only filter by attendee
    const meetings = await Meeting.find(baseQuery);

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

      case "move":
        if (index === undefined)
          return res.status(400).json({ error: "Index is required for moving." });
        if (index < 0 || index >= meeting.agenda.length)
          return res.status(400).json({ error: "Invalid agenda index." });

        const movedToPending = meeting.agenda.splice(index, 1)[0];
        if (!meeting.pending) meeting.pending = [];
        meeting.pending.push(movedToPending);
        break;

      case "moveToAgenda":
        if (index === undefined)
          return res.status(400).json({ error: "Index is required for moving to agenda." });
        if (!Array.isArray(meeting.pending) || index < 0 || index >= meeting.pending.length)
          return res.status(400).json({ error: "Invalid pending item index." });

        const movedToAgenda = meeting.pending.splice(index, 1)[0];
        meeting.agenda.push(movedToAgenda);
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

// Close a meeting by updating its status to complete
exports.closeMeeting = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Meeting ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid meeting ID' });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { status: "complete" },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    res.status(200).json({
      message: "Meeting closed successfully.",
      meeting,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMeetingStatus = async (req, res) => {
  try {
    const { id, action } = req.body;

    if (!id || !action) {
      return res.status(400).json({ error: "Meeting ID and action are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid meeting ID." });
    }

    let statusToUpdate;
    if (action === "start") {
      statusToUpdate = "in-progress";
    } else if (action === "close") {
      statusToUpdate = "completed";
    } else {
      return res.status(400).json({ error: "Invalid action. Use 'start' or 'close'." });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { status: statusToUpdate },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    res.status(200).json({
      message: `Meeting ${action === "start" ? "started" : "closed"} successfully.`,
      meeting,
    });
  } catch (error) {
    console.error("Meeting status update error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


exports.agreementHandler = async (req, res) => {
  const { meetingId, action, agreementId } = req.body;

  if (!meetingId || !action) {
    return res.status(400).json({ error: "Meeting ID and action are required." });
  }

  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ error: "Meeting not found." });

    switch (action) {
      case "delete":
        if (!agreementId)
          return res.status(400).json({ error: "Agreement ID is required for deleting." });

        const originalLength = meeting.agreement.length;

        // Filter out the agreement with the matching _id
        meeting.agreement = meeting.agreement.filter(
          (agreement) => agreement._id.toString() !== agreementId
        );

        if (meeting.agreement.length === originalLength) {
          return res.status(404).json({ error: "Agreement not found." });
        }

        break;

      default:
        return res.status(400).json({ error: "Invalid action. Only 'delete' is supported." });
    }

    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const PDFDocument = require('pdfkit');

exports.generateMeetingPDF = async (req, res) => {
  try {
    const { meetingId } = req.body;
    if (!meetingId) {
      return res.status(400).json({ error: "Meeting ID is required." });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found." });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=meeting_${meetingId}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    const pageWidth = doc.page.width;
    let y = 60;

    // --- Title ---
    doc
      .font('Helvetica-Bold')
      .fontSize(20)
      .fillColor('#000')
      .text(`Meeting Minutes - ${meeting.title || meeting._id}`, { align: 'center' });
    y += 60;

    // --- Meeting Info ---
    const formattedDate = meeting.date || 'N/A';
    const time = meeting.time || 'N/A';
    const duration = meeting.duration ? `${meeting.duration} minutes` : 'N/A';
    const status = meeting.status || 'N/A';

    // Get host from attendees by role
    const hostAttendee = (meeting.attendees || []).find(a => a.role === 'host');
    const fullHost = hostAttendee
      ? `${hostAttendee.email || 'Host'} (${hostAttendee.name})`
      : meeting.owner || 'N/A';

    doc
      .font('Helvetica')
      .fontSize(12)
      .fillColor('#000')
      .text(`Date: ${formattedDate}`, 60, y)
      .text(`Time: ${time}`, 60, y + 18)
      .text(`Duration: ${duration}`, 60, y + 36)
      .text(`Status: ${status}`, 60, y + 54)
      .text(`Host: ${fullHost}`, 60, y + 72);
    y += 110;

    // --- Attendees (exclude host) ---
    const attendees = (meeting.attendees || []).filter(a => a.role !== 'host');
    if (attendees.length > 0) {
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Attendees:', 60, y);
      y += 20;

      attendees.forEach((a, idx) => {
        const nameOrEmail = a.name || a.email;
        doc.font('Helvetica').fontSize(12).text(`${idx + 1}. ${nameOrEmail}`, 70, y);
        y += 18;
      });

      y += 20;
    }

    // --- Agenda Header ---
    doc.rect(50, y, pageWidth - 100, 25).fill('#e0e0e0');
    doc
      .fillColor('#000')
      .font('Helvetica-Bold')
      .fontSize(14)
      .text('Agenda', 60, y + 7);
    y += 35;

    const agendaItems = Array.isArray(meeting.agenda) ? meeting.agenda : [];
    doc.font('Helvetica').fontSize(12).fillColor('#000');
    if (agendaItems.length === 0) {
      doc.text('No agenda items.', 60, y);
      y += 20;
    } else {
      agendaItems.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item}`, 70, y);
        y += 20;
      });
    }

    y += 30;

    // --- Pending Header ---
    doc.rect(50, y, pageWidth - 100, 25).fill('#e0e0e0');
    doc
      .fillColor('#000')
      .font('Helvetica-Bold')
      .fontSize(14)
      .text('Pending Items', 60, y + 7);
    y += 35;

    const pendingItems = Array.isArray(meeting.pending) ? meeting.pending : [];
    doc.font('Helvetica').fontSize(12).fillColor('#000');
    if (pendingItems.length === 0) {
      doc.text('No pending items.', 60, y);
      y += 20;
    } else {
      pendingItems.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item}`, 70, y);
        y += 20;
      });
    }

    y += 30;

    // --- Agreements Header ---
    doc.rect(50, y, pageWidth - 100, 25).fill('#e0e0e0');
    doc
      .fillColor('#000')
      .font('Helvetica-Bold')
      .fontSize(14)
      .text('Agreements', 60, y + 7);
    y += 35;

    const agreements = Array.isArray(meeting.agreement) ? meeting.agreement : [];
    doc.font('Helvetica').fontSize(12).fillColor('#000');
    if (agreements.length === 0) {
      doc.text('No agreements.', 60, y);
    } else {
      agreements.forEach((item, idx) => {
        const title = item.title || 'Untitled';
        const description = item.description || '';
        const type = item.type === 'task_assignment' ? 'Task' : 'General';
        const deadline = item.deadline ? `Deadline: ${new Date(item.deadline).toLocaleDateString()}` : '';
        const assignees = item.assignees?.length
          ? `Assignees: ${item.assignees.join(', ')}`
          : '';

        doc.text(`${idx + 1}. ${title} [${type}]`, 70, y);
        y += 18;

        if (description) {
          doc.text(`   - ${description}`, 75, y);
          y += 18;
        }

        if (deadline) {
          doc.text(`   - ${deadline}`, 75, y);
          y += 18;
        }

        if (assignees) {
          doc.text(`   - ${assignees}`, 75, y);
          y += 18;
        }

        y += 10;
      });
    }

    doc.end();
  } catch (error) {
    console.error('Error generating styled PDF:', error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

exports.addAttendee = async (req, res) => {
  try {
    const { meetingId, name, email, role, organization } = req.body;

    if (!meetingId || !email) {
      return res.status(400).json({ error: "Meeting ID and email are required" });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    // Check for duplicate email
    const exists = meeting.attendees.some(att => att.email === email);
    if (exists) {
      return res.status(400).json({ error: "Attendee already added" });
    }

    meeting.attendees.push({
      name: name || null,
      email,
      organization: organization || null,
      role: role || 'participant'
    });

    await meeting.save();

    res.json({ message: "Attendee added successfully", attendees: meeting.attendees });
  } catch (err) {
    console.error("Error adding attendee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
