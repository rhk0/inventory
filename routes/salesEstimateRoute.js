import express from "express";
import formidable from "express-formidable";

import { createSalesEstimateController, deleteSalesEstimateController, getSalesEstimateByIdController, getSalesEstimatesController, updateSalesEstimateController } from "../controllers/SalesEstimateController.js";
import { deletSalesInvoiceByIDController, getAllSalesInvoiceCOntroller } from "../controllers/salesInvoiceController.js";

const router = express.Router();

router.post("/createSalesEstimatet",  createSalesEstimateController);
router.get("/getAllSalesEstimatet",  getSalesEstimatesController);
router.get("/getAllSalesEstimatetByID/:_id",  getSalesEstimateByIdController);
router.delete("/deleteSalesEstimatetByID/:_id",  deleteSalesEstimateController);
router.put("/updateSalesEstimatetByID/:_id",  updateSalesEstimateController);





export default router;