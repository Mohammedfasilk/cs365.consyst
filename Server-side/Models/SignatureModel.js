const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    phNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    addresses: {
      type: [],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Signature', signatureSchema);