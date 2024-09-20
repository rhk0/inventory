import express from "express";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createPurchaseReturnController, deletePurchaseReturnByIdController, getAllPurchaseReturnController, getPurchaseReturnByIdController, updatePurchaseReturnByIdController } from "../controllers/purchesReturnController.js";


const router = express.Router();

router.post("/createpurchasereturn",requireSignIn,isAdmin, createPurchaseReturnController);
router.get("/getAllpurchasereturn",requireSignIn,isAdmin, getAllPurchaseReturnController);
router.get("/getAllpurchasereturnById/:_id",requireSignIn,isAdmin, getPurchaseReturnByIdController);
router.put("/updatepurchasereturn/:_id",requireSignIn,isAdmin, updatePurchaseReturnByIdController);
router.delete("/deletepurchasereturn/:_id",requireSignIn,isAdmin,deletePurchaseReturnByIdController);

export default router;