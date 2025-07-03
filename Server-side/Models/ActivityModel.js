const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    date: { type: String, required: true },
  }
);

const commonActivity = new mongoose.Schema(
  {
    username: { type: String, required: true },

    date: { type:String, required: true },

    activity: { type: String, required: true },

    type: { type: String, required: true , default:'Save/Update'},

    },
);

const activitySchema = new mongoose.Schema(
  {
   login:[loginSchema],
   project_management:[commonActivity],
   cost_control:[commonActivity],
   settings:[commonActivity]
  }
);

module.exports = mongoose.model('Activities', activitySchema);