import express from "express"
import { registerController } from "../controllers/companyController.js";
import formidable from "express-formidable"




const router = express.Router();

router.post("/register",formidable(),registerController)


export default router;
