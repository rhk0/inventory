import express from "express"
import { createSalesController } from "../controllers/salesController.js";

const router = express.Router();

router.post("/createSalesQuotaition",createSalesController);
// router.get("/manageStaff",manageStaffController)
// router.get("/manageSingleStaff/:_id",manageSingleStaffController)
// router.delete("/deletestaff/:_id", deleteStaffController);

export default router;
