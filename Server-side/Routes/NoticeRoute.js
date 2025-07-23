const express = require('express');
const { getAllNotices, deleteNotice, getNoticeById, createOrUpdateNotice } =  require('../Controllers/NoticeController.js');
const { upload } =  require('../utils/multer.js');

const router = express.Router();

router.post('/', upload.single('banner'), createOrUpdateNotice);
router.get('/', getAllNotices);
router.post('/delete', deleteNotice);
router.get("/:id", getNoticeById);

module.exports = router;
