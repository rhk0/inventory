import express from "express"
import { activeUserController, getAllUserController, getSubscribedController, InActiveUserController, revenueController } from "../controllers/superAdminController.js";
import { isSuperAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all-users", requireSignIn,isSuperAdmin,getAllUserController)
router.get("/active-users", requireSignIn,isSuperAdmin,activeUserController)
router.get("/inActive-users", requireSignIn,isSuperAdmin,InActiveUserController)
router.get("/subscribed-users",requireSignIn,isSuperAdmin,getSubscribedController)
router.get("/revenue",requireSignIn,isSuperAdmin,revenueController)

export default router;