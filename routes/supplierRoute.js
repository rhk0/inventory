import express from "express"
import { createSupplierController } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/createSupplier",createSupplierController);


export default router;
