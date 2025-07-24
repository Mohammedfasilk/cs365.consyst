const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default:'upcoming'
  },

  attendees: [{
    name:{type:String,default:null},
    email:String,
    organization: { type: String, default: 'consyst' },
    role:{type:String,default:'participant'}
  }],
  agreement: [{
    assignees:[],
    deadline:{type:String},
    description:{type:String},
    title:{type:String},
    type:{type:String}
  }],

  agenda: [],
  
  pending: [],
});

module.exports = mongoose.model("Meetings", meetingSchema);
