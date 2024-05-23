import mongoose from "mongoose";
import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import comanyRoute from "./routes/companyRoute.js"

import authRoute from './routes/authRoute.js'
import supplierRoute from "./routes/supplierRoute.js"

//configuration of dotenv 
dotenv.config();

//calling the db funciton 
connectDb();


// creating app 
const app = express();
app.use(cors())
app.use(express.json())

// all apies  here 
app.use("/api/v1/company",comanyRoute)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/auth",supplierRoute)
app.listen(process.env.PORT,async()=>{
    console.log(`Server is Running on port ${process.env.PORT } in ${process.env.DEV_MODE} mode`)
})

/// server code