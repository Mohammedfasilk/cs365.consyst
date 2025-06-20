const express = require('express');
const { fetchProjectList, getProjects, updateMonthlyCost, fetchCostControlProjects, getMonthlyBudget } = require('../Controllers/Costcontroller');
const  router = express.Router();

router.post('/list',fetchProjectList);
router.post('/project-list',fetchCostControlProjects);
router.post('/projects',getProjects);
router.post('/monthly-data',updateMonthlyCost);
router.post('/monthly-budget',getMonthlyBudget);
// router.get('/',getProjects);


module.exports = router;