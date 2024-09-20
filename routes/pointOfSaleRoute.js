import express from "express";
import {
  createPOFController,
  deletePOFByIDController,
  getAllPOFByIdController,
  getAllPOFController,
  updatePOFByIDController,
} from "../controllers/pointOfSaleController.js";

const router = express.Router();

router.post("/createsalespof", createPOFController);
router.get("/getAllpof", getAllPOFController);
router.get("/getAllpofById/:_id", getAllPOFByIdController);
router.put("/updatepof/:_id", updatePOFByIDController);
router.delete("/deletepof/:_id", deletePOFByIDController);

export default router;
