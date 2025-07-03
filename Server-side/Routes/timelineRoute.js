const express = require('express');
const { updateTimelineTask, getTimelineTasks, deleteTimelineTasks, getTimelineProjects } = require('../Controllers/TimelineController');
const  router = express.Router();

router.post('/task-update',updateTimelineTask);
router.post('/tasks',getTimelineTasks);
router.post('/task-delete',deleteTimelineTasks);
router.post('/projects',getTimelineProjects);


module.exports = router;