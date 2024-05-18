import express from "express";
import { loginController, userRegisterController, verificationController } from "../controllers/authController.js";
import { mailController } from "../middleware/mailController.js";

const router=express.Router();

router.post('/register',userRegisterController)
router.post('/mail',mailController)
router.post('/verification',verificationController )
router.post('/login',loginController)
export default router