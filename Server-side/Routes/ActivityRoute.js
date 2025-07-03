const express = require('express');
const { updateActivity } = require('../Controllers/ActivityController');
const router = express.Router();

router.post('/', updateActivity);

module.exports = router;