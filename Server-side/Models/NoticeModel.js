const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: String,
    category: String,
    banner: String, // base64 string
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Notice", noticeSchema);
