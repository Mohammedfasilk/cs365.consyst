const express = require('express');
const { fetchProjectList } = require('../Controllers/Costcontroller');
const  router = express.Router();

router.post('/list',fetchProjectList);
// router.post('/save-costcontrol',createProject);
// router.post('/delete',deleteProject);
// router.get('/',getProjects);


module.exports = router;