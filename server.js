import mongoose from "mongoose";
import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import comanyRoute from "./routes/companyRoute.js"
import authRoute from './routes/authRoute.js'
import supplierRoute from "./routes/supplierRoute.js"
import customerRoute from "./routes/customerRoute.js"
import transportRoute from "./routes/transportRoute.js"
import vendorRoute from "./routes/vendorRoute.js"
import staffRoute from "./routes/staffRoute.js"
import cashRoute from "./routes/cashRoute.js"
import bankRoute from "./routes/bankRoute.js"
import bankTransctionRoute from "./routes/bankTransctionRoute.js"
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
app.use("/api/v1/auth",customerRoute)
app.use("/api/v1/auth",transportRoute)
app.use("/api/v1/auth",vendorRoute)
app.use("/api/v1/auth",staffRoute)
app.use("/api/v1/auth",bankRoute)
app.use("/api/v1/auth",bankTransctionRoute)


app.listen(process.env.PORT,async()=>{
    console.log(`Server is Running on port ${process.env.PORT } in ${process.env.DEV_MODE} mode`)
})

/// server code