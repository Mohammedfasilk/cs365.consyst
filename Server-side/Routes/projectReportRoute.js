const express = require('express');
const { getProjectReport } = require('../Controllers/projectReportController');
const  router = express.Router();


router.post('/',getProjectReport);



module.exports = router;