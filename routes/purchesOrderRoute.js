import express from "express";
import {
  createPurchesOrderController,
  deletePurchesOrderByIdController,
  getAllPurchesOrderByIdController,
  getAllPurchesOrderController,
  updatePurchesOrderByIdController,
} from "../controllers/purchesOrderController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createpurchesorder",requireSignIn,isAdmin, createPurchesOrderController);
router.get("/getAllpurchesorder",requireSignIn,isAdmin, getAllPurchesOrderController);
router.get("/getAllpurchesorderById/:_id",requireSignIn,isAdmin, getAllPurchesOrderByIdController);
router.put("/updatepurchesorder/:_id", requireSignIn,isAdmin,updatePurchesOrderByIdController);
router.delete("/deletepurchesorder/:_id", requireSignIn,isAdmin,deletePurchesOrderByIdController);

export default router;
