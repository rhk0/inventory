import express from "express";

import {
  createPayInController,
  deletePayInByIdController,
  getAllPayInController,
  getPayInByIdController,
  updatePayInByIdController,
} from "../controllers/PayInController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createsalespayin",isAdmin,requireSignIn, createPayInController);
router.get("/getAllpayin", getAllPayInController);
router.get("/getAllpayinById/:_id", getPayInByIdController);
router.put("/updatepayin/:_id", updatePayInByIdController);
router.delete("/deletepayin/:_id", deletePayInByIdController);

export default router;
