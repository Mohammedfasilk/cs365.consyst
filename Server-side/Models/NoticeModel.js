const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    type: { type: String, required: true },
    category: { type: String, required: true },
    banner: { type: String }, // image path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
