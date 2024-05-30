import express from "express"
import { createSupplierController, deleteSupplierController, manageSingleSupplierController, manageSupplierController, updateSupplierController } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/createSupplier",createSupplierController);
router.get("/manageSupplier",manageSupplierController)
router.get("/manageSingleSupplier/:_id",manageSingleSupplierController)
router.delete("/deletesupplier/:_id", deleteSupplierController);
router.put("/updateSupplier/:_id", updateSupplierController);
export default router;
