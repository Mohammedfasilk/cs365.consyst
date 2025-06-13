const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true, match:[/.+@.+\..+/, 'Invalid email']},
    name:{type:String},
    roles:{type:[String], required:true, validate: [roles => roles.length > 0, 'Roles should not be empty']}
}, {timestamps:true})

module.exports =  mongoose.model('User',userSchema)

