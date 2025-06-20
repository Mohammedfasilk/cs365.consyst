const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv').config()
const db = require('./Config/db')
const app = express ()
const path = require('path');
const fs = require('fs');

const Auth = require('./Routes/AuthRoute')
const Sales_pipeline = require("./Routes/Sales_pipeline")
const SalesAnalysis = require("./Routes/SalesAnalysisRoute")
const Settings  = require('./Routes/settingsRoutes')
const User  = require('./Routes/userRoutes')
const emailSignature = require('./Routes/emailSignatureRoutes')
const emailSignatureGlobal = require('./Routes/emailSignatureGlobalRoutes')
const Signature= require('./Routes/SignatureRoute')
const Project= require('./Routes/ProjectRoutes')
const costControl = require('./Routes/costControlRoute')

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    optionsSuccessStatus: 200,
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
app.use('/api/cost-control',costControl);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("running at",PORT);
    
})