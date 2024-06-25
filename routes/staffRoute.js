import express from "express"
import { createstaffController, deleteStaffController, manageSingleStaffController, manageStaffController } from "../controllers/staffController.js";
import formidable from "express-formidable"

const router = express.Router();

router.post("/createStaff",createstaffController);
router.get("/manageStaff",manageStaffController)
router.get("/manageSingleStaff/:_id",manageSingleStaffController)
router.delete("/deletestaff/:_id", deleteStaffController);

export default router;
