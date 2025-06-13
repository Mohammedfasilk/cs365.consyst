const express = require('express');
const  router = express.Router();
const { fetchProjectList, fetchSalesOrder, createProject, getProjects, updateBudget, deleteProject } = require('../Controllers/ProjectController');


router.post('/list',fetchProjectList);
router.post('/sales-order',fetchSalesOrder);
router.post('/save-project',createProject);
router.post('/budget',updateBudget);
router.post('/delete',deleteProject);
router.get('/',getProjects);


module.exports = router;