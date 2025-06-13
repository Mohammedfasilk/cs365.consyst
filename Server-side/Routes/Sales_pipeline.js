const express = require('express')
const  router = express.Router();
const {salesPipelineSum,salesPipelineCount,TopOpportunity} = require("../Controllers/PipelineController")

router.get('/sum',salesPipelineSum)
router.get('/count',salesPipelineCount)
router.get('/top-opportunities',TopOpportunity)

module.exports = router;