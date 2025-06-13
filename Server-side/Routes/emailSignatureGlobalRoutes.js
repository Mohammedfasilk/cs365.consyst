const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {getGlobalSettings,updateGlobalSettings,} = require('../Controllers/EmailSignatureGlobalController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, `company-banner${path.extname(file.originalname)}`) 
});
const upload = multer({ storage });

router.get('/', getGlobalSettings);
router.post('/', upload.single("banner"), updateGlobalSettings);

module.exports = router;
