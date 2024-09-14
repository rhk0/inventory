import express from "express";
import {
  createSalesInvoiceController,
  deletSalesInvoiceByIDController,
  getAllSalesInvoiceByIdController,
  getAllSalesInvoiceCOntroller,
  updateSalesInvoiceByIDController,
} from "../controllers/salesInvoiceController.js";

const router = express.Router();

router.post("/createsalesinvoice", createSalesInvoiceController);
router.get("/getAllsalesinvoice", getAllSalesInvoiceCOntroller);
router.get("/getAllsalesinvoiceById/:_id", getAllSalesInvoiceByIdController);
router.put("/updatesalesinvoice/:_id", updateSalesInvoiceByIDController);
router.delete("/deletesalesinvoice/:_id", deletSalesInvoiceByIDController);

export default router;
