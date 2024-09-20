import express from "express";

import {
  createPayOutController,
  deletePayOutByIdController,
  getAllPayOutController,
  getPayOutByIdController,
  updatePayOutByIdController,
} from "../controllers/PayOutController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/PayOutRoute",requireSignIn,isAdmin, createPayOutController);
router.get("/getAllpayout",requireSignIn,isAdmin, getAllPayOutController);
router.get("/getAllpayoutById/:_id",requireSignIn,isAdmin, getPayOutByIdController);
router.put("/updatepayout/:_id",requireSignIn,isAdmin, updatePayOutByIdController);
router.delete("/deletepayout/:_id",requireSignIn,isAdmin, deletePayOutByIdController);

export default router;