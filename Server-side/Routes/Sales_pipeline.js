const express = require('express')
const  router = express.Router();
const {salesPipelineSum,salesPipelineCount,TopOpportunity, FocusOpportunity} = require("../Controllers/PipelineController")

router.get('/sum',salesPipelineSum)
router.get('/count',salesPipelineCount)
router.get('/top-opportunities',TopOpportunity)
router.get('/focus-opportunities',FocusOpportunity)

module.exports = router;