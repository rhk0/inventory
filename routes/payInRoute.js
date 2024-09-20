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

router.post("/createsalespayin",requireSignIn,isAdmin, createPayInController);
router.get("/getAllpayin",requireSignIn,isAdmin, getAllPayInController);
router.get("/getAllpayinById/:_id",requireSignIn,isAdmin, getPayInByIdController);
router.put("/updatepayin/:_id",requireSignIn,isAdmin, updatePayInByIdController);
router.delete("/deletepayin/:_id",requireSignIn,isAdmin, deletePayInByIdController);

export default router;
