// utils/multer.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Stores files in memory

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WEBP files are allowed"), false);
    }
  },
});

module.exports = { upload };
