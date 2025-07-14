const express = require('express');
const { createMeeting, getMeetings, getMeetingById } = require('../Controllers/MeetingController');
const router = express.Router();

router.post('/create', createMeeting);
router.post('/', getMeetings)
router.post('/id', getMeetingById)
// router.post('/delete', '');

module.exports = router;
