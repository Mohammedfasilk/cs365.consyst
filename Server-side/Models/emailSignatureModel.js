const mongoose = require('mongoose')

const emailSignatureSchema = new mongoose.Schema({
    label:{type:mongoose.Schema.Types.Mixed, required:true,},
    title:{type:mongoose.Schema.Types.Mixed, required:true,},
    content:{type:String, match: /^[a-zA-Z0-9@#_\+\-\. ]*$/,required:true,},
})

module.exports = mongoose.model('emailSignature', emailSignatureSchema)