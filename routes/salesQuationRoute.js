import express from "express";
import {
  createSalesController,
  deletSalesQuotationByIDController,
  getAllSalesQuotationCOntroller,
  updateQuotationByIDController,
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/createSalesQuotaition", createSalesController);
router.get("/getAllSalesQuotation", getAllSalesQuotationCOntroller);
router.put("/updateSalesQuotation/:_id", updateQuotationByIDController);
router.delete("/deleteSalesQuotation/:_id", deletSalesQuotationByIDController);

export default router;
