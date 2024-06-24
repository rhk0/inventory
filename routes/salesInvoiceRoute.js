import express from "express";
import {
  createSalesInvoiceController,
  deletSalesInvoiceByIDController,
  getAllSalesInvoiceCOntroller,
  updateSalesInvoiceByIDController,
} from "../controllers/salesInvoiceController.js";

const router = express.Router();

router.post("/createsalesinvoice", createSalesInvoiceController);
router.get("/getAllsalesinvoice", getAllSalesInvoiceCOntroller);
router.put("/updatesalesinvoice/:_id", updateSalesInvoiceByIDController);
router.delete("/deletesalesinvoice/:_id", deletSalesInvoiceByIDController);

export default router;
