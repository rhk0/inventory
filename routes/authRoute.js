import express from "express";
import { userRegisterController, verificationController } from "../controllers/authController.js";
import { mailController } from "../middleware/mailController.js";

const router=express.Router();

router.post('/register',userRegisterController)
router.post('/mail',mailController)
router.post('/verification',verificationController )
export default router