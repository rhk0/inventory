
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
// import staffRoute from "./routes/staffRoute.js"
import cashRoute from "./routes/cashRoute.js"
import bankRoute from "./routes/bankRoute.js"
import bankTransctionRoute from "./routes/bankTransctionRoute.js"
import InventoryCategoryRoute from "./routes/InventoryCategoryRoute.js"
import InventorySubCategoryRoute from "./routes/InventorySubCategoryRoute.js"
import InventoryBrandRoute from "./routes/InventoryBrandRoute.js"
import InventroySubBrandRoute from "./routes/InventroySubBrandRoute.js"
import InventoryStockUnitRoute from "./routes/InventoryStockUnitRoute.js"
import InventoryCreateBranchesRoute from "./routes/InventoryCreateBranchesRoute.js"
import productRoute from "./routes/productRoute.js"
import salesQuationRoute from "./routes/salesQuationRoute.js"
import salesInvoiceRoute from "./routes/salesInvoiceRoute.js"
import deliveryChallanRoute from "./routes/deliveryChallanRoute.js"
import manufacturerRoute from "./routes/manufacturerRoute.js"
import salesEstimateRoute from "./routes/salesEstimateRoute.js"
import expensesRoute from "./routes/expensesRoute.js"
import incomeRoute from "./routes/incomeRoute.js"
import formidable from 'express-formidable';

import subscriptionRoute from "./routes/subsCriptionRoute.js"


import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


dotenv.config();

//calling the db funciton 
connectDb();

// creating app 
const app = express();
app.use(cors())
app.use(express.json())


app.use("/api/v1/company",comanyRoute)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/auth",supplierRoute)
app.use("/api/v1/auth",customerRoute)
app.use("/api/v1/auth",transportRoute)
app.use("/api/v1/auth",vendorRoute)
// app.use("/api/v1/auth",staffRoute)
app.use("/api/v1/auth",bankRoute)
app.use("/api/v1/auth",cashRoute);
app.use("/api/v1/auth",bankTransctionRoute)
app.use("/api/v1/auth",InventoryCategoryRoute)
app.use("/api/v1/auth",InventorySubCategoryRoute)
app.use("/api/v1/auth",InventoryBrandRoute)
app.use("/api/v1/auth",InventroySubBrandRoute)
app.use("/api/v1/auth",InventoryStockUnitRoute)
app.use("/api/v1/auth",InventoryCreateBranchesRoute)
app.use("/api/v1/auth",productRoute)
app.use("/api/v1/auth",manufacturerRoute)
app.use("/api/v1/salesQuationRoute",salesQuationRoute)
app.use("/api/v1/salesInvoiceRoute",salesInvoiceRoute)
app.use("/api/v1/deliveryChallanRoute",deliveryChallanRoute)
app.use("/api/v1/salesEstimateRoute",salesEstimateRoute)
app.use("/api/v1/expensesRoute",expensesRoute)
app.use("/api/v1/incomeRoute",incomeRoute)

//change dheeru
//change 

//subscription routes 

app.use("/api/v1/subscription",subscriptionRoute)
app.use("/uploads",express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/build")));

// Catch-all route to serve the React app for all non-API routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(formidable());
app.listen(process.env.PORT,async()=>{
    console.log(`Server is Running on port ${process.env.PORT } in ${process.env.DEV_MODE} mode`)
})

/// server code