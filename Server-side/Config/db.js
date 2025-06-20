const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/CS365"

mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>
    console.log(`MongoDB connected successfully at ${MONGO_URI}`))
    .catch(err => console.error("MongoDB Connection error:",err))