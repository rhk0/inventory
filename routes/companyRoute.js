import express from "express"
import { getController, registerController } from "../controllers/companyController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";




const router = express.Router();

router.post("/register",requireSignIn,isAdmin,registerController)
router.get("/get/:admin",getController)


export default router;
