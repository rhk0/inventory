import express from "express";
import { subPlanCreateController, subPlanDeleteController, subPlanGetAllController, subPlanGetSingleController, subPlanUpdateController } from "../controllers/subscription/subscriptionController.js";
import { isAdmin, requireSignIn,isSuperAdmin } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/create",requireSignIn,  isSuperAdmin,subPlanCreateController)
router.get("/all",requireSignIn,isAdmin,subPlanGetAllController)
router.get("/single/:_id",requireSignIn,isAdmin,subPlanGetSingleController)
router.put("/update/:_id", requireSignIn,isAdmin,subPlanUpdateController)
router.delete("/delete/:_id",  requireSignIn,isAdmin,subPlanDeleteController)
    
export default router;
