import express from "express";

import {
  createPayInController,
  deletePayInByIdController,
  getAllPayInController,
  getPayInByIdController,
  updatePayInByIdController,
} from "../controllers/PayInController.js";

const router = express.Router();

router.post("/createsalespayin", createPayInController);
router.get("/getAllpayin", getAllPayInController);
router.get("/getAllpayinById/:_id", getPayInByIdController);
router.put("/updatepayin/:_id", updatePayInByIdController);
router.delete("/deletepayin/:_id", deletePayInByIdController);

export default router;
