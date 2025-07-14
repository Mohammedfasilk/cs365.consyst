const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv').config()
const app = express ()
const path = require('path');
const fs = require('fs');

const connectDB = require("./Config/db");

const Auth = require('./Routes/AuthRoute')
const Sales_pipeline = require("./Routes/Sales_pipeline")
const SalesAnalysis = require("./Routes/SalesAnalysisRoute")
const Settings  = require('./Routes/settingsRoutes')
const User  = require('./Routes/userRoutes')
const emailSignature = require('./Routes/emailSignatureRoutes')
const emailSignatureGlobal = require('./Routes/emailSignatureGlobalRoutes')
const Signature= require('./Routes/SignatureRoute')
const Project= require('./Routes/ProjectRoutes')
const OrderBooking = require('./Routes/OrderBookingRoutes')
const costControl = require('./Routes/costControlRoute')
const projectReport = require('./Routes/projectReportRoute')
const timeLine = require('./Routes/timelineRoute')
const activity = require('./Routes/ActivityRoute')
const meetings = require('./Routes/MeetingRoute')

//middlewares
app.use(express.json())
app.use(cors({
    origin: ["https://cs365consyst.vercel.app","http://localhost:5173"],
    methods: 'GET,POST',
  }))

//routes
app.use('/api/auth',Auth);
app.use('/api/sales-pipeline',Sales_pipeline)
app.use('/api/sales-analysis',SalesAnalysis)
app.use('/api/settings',Settings)
app.use('/api/user',User)
app.use('/api/emailSignature',emailSignature)
app.use('/api/emailSignatureGlobal', emailSignatureGlobal);
app.use('/api/signature', Signature);
app.use('/api/projects',Project);
app.use('/api/orders', OrderBooking);
app.use('/api/cost-control',costControl);
app.use('/api/project-report',projectReport);
app.use('/api/timeline',timeLine);
app.use('/api/activity',activity);
app.use('/api/meeting',meetings);


const PORT = process.env.PORT || 3000;
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log("running at",PORT);
});
})
 .catch((err) => {
    console.error("Failed to connect to DB. Server not started.");
    process.exit(1);
  });