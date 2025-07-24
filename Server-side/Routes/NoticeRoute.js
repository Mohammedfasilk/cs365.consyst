const express = require("express");
const {
  getAllNotices,
  deleteNotice,
  getNoticeById,
  createOrUpdateNotice,
} = require("../Controllers/NoticeController.js");

const { upload } = require("../utils/multer.js"); // updated for memoryStorage

const router = express.Router();

// 🔁 Create or update notice (base64 banner stored)
router.post("/", createOrUpdateNotice);

// 📥 Get all notices
router.get("/", getAllNotices);

// 📄 Get single notice
router.get("/:id", getNoticeById);

// 🗑️ Delete notice
router.post("/delete", deleteNotice);

module.exports = router;
