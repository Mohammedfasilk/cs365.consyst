const express = require('express');
const { updateTimelineTask, getTimelineTasks, deleteTimelineTasks } = require('../Controllers/TimelineController');
const  router = express.Router();

router.post('/task-update',updateTimelineTask);
router.post('/tasks',getTimelineTasks);
router.post('/task-delete',deleteTimelineTasks);


module.exports = router;