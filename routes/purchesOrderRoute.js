import express from "express";
import {
  createPurchesOrderController,
  deletePurchesOrderByIdController,
  getAllPurchesOrderByIdController,
  getAllPurchesOrderController,
  updatePurchesOrderByIdController,
} from "../controllers/purchesOrderController.js";

const router = express.Router();

router.post("/createpurchesorder", createPurchesOrderController);
router.get("/getAllpurchesorder", getAllPurchesOrderController);
router.get("/getAllpurchesorderById/:_id", getAllPurchesOrderByIdController);
router.put("/updatepurchesorder/:_id", updatePurchesOrderByIdController);
router.delete("/deletepurchesorder/:_id", deletePurchesOrderByIdController);

export default router;
