const express = require('express');
const multer = require('multer');
const router = express.Router();
const {getGlobalSettings,updateGlobalSettings,} = require('../Controllers/EmailSignatureGlobalController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getGlobalSettings);
router.post('/', upload.single("banner"), updateGlobalSettings);

module.exports = router;
