import express from "express";
import { subPlanCreateController, subPlanDeleteController, subPlanGetAllController, subPlanGetSingleController, subPlanUpdateController } from "../controllers/subscription/subscriptionController.js";
import { isAdmin, requireSignIn,isSuperAdmin } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/create",requireSignIn, isSuperAdmin,subPlanCreateController)
router.get("/all",subPlanGetAllController)
router.get("/single/:_id",subPlanGetSingleController)
router.put("/update/:_id", requireSignIn,isSuperAdmin,subPlanUpdateController)
router.delete("/delete/:_id",  requireSignIn,isSuperAdmin,subPlanDeleteController)
    
export default router;
