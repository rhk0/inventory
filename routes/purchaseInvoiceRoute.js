import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createPurchaseInvoiceController, deletePurchaseInvoiceByIdController, getAllPurchaseByNameInvoiceController, getAllPurchaseInvoiceController, getPurchaseInvoiceByIdController, updatePurchaseInvoiceByIdController } from "../controllers/purchesInvoiceController.js";

const router = express.Router();

router.post("/createpurchaseinvoice",requireSignIn,isAdmin, createPurchaseInvoiceController);
router.get("/getAllpurchaseinvoice",requireSignIn,isAdmin, getAllPurchaseInvoiceController);
router.get("/getAllpurchaseinvoiceById/:_id",requireSignIn,isAdmin, getPurchaseInvoiceByIdController);
router.put("/updatepurchaseinvoice/:_id",requireSignIn,isAdmin, updatePurchaseInvoiceByIdController);
router.delete("/deletepurchaseinvoice/:_id",requireSignIn,isAdmin,deletePurchaseInvoiceByIdController );

router.get('/purchaseinvoicesByName/:supplierName', getAllPurchaseByNameInvoiceController);

export default router;
