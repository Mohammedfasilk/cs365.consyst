const express = require('express');
const { createMeeting, getMeetings, getMeetingById, agendaHandler,  createOrUpdateAgreement } = require('../Controllers/MeetingController');
const router = express.Router();

router.post('/create', createMeeting);
router.post('/', getMeetings)
router.post('/id', getMeetingById)
router.post('/handle-agenda', agendaHandler)
router.post('/create-agreement', createOrUpdateAgreement)
// router.post('/delete', '');

module.exports = router;
