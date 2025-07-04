const express = require('express');
const { updateTimelineTask, getTimelineTasks, deleteTimelineTasks, getTimelineProjects, fetchTasks, saveSchedules, fetchSchedules, deleteSchedule, updateStatus } = require('../Controllers/TimelineController');
const  router = express.Router();

router.post('/task-update',updateTimelineTask);
router.post('/tasks',getTimelineTasks);
router.post('/task-delete',deleteTimelineTasks);
router.post('/projects',getTimelineProjects);
router.post('/saveSchedules',saveSchedules);
router.get('/schedules',fetchSchedules);
router.post('/delete',deleteSchedule);
router.post('/status-update',updateStatus);
router.post('/',fetchTasks);


module.exports = router;