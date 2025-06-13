const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    currentFyStartDate: String,
    usdToinr: Number,
    usdToaed: Number,
    cmefTarget: Number,   //AED
    ctiplTarget: Number,  //INR
    cdiplTarget: Number,  //INR
    groupTarget: Number,  //USD

}, { timestamps: true })

module.exports = mongoose.model('settings', settingsSchema)