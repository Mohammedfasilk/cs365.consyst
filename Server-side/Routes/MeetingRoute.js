const express = require('express');
const { createMeeting, getMeetings, getMeetingById, agendaHandler,  createOrUpdateAgreement, updateMeetingStatus, agreementHandler, generateMeetingPDF, deleteMeeting, addAttendee } = require('../Controllers/MeetingController');
const router = express.Router();

router.post('/create', createMeeting);
router.post('/', getMeetings)
router.post('/id', getMeetingById)
router.post('/handle-agenda', agendaHandler)
router.post('/handle-agreement', agreementHandler)
router.post('/create-agreement', createOrUpdateAgreement)
router.post('/handle-status', updateMeetingStatus)
router.post('/generate-pdf', generateMeetingPDF)
router.post('/delete/:id', deleteMeeting);
router.post('/add-attendee', addAttendee);

module.exports = router;
