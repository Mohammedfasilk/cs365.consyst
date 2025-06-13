const express = require('express')
const  router = express.Router();
const { saveSettings, getSettings } = require('../Controllers/SettingsController');

router.post('/',saveSettings)
router.get('/',getSettings)

module.exports = router;