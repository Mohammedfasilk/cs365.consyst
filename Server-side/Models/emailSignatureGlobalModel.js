const mongoose = require('mongoose')

const emailSignatureGlobalSchema = new mongoose.Schema({
  banner: { type: String },
  legalDisclaimer: { type: String },
})

module.exports = mongoose.model('emailSignatureGlobal',emailSignatureGlobalSchema)