const express = require('express');
const { createNotice, getAllNotices } =  require('../Controllers/NoticeController.js');
const { upload } =  require('../utils/multer.js');

const router = express.Router();

router.post('/', upload.single('banner'), createNotice);
router.get('/', getAllNotices);

module.exports = router;
