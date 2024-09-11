import express from "express";
import { forgetController, loginController, resetPasswordController, userRegisterController, verificationController } from "../controllers/authController.js";
import { mailController } from "../middleware/mailController.js";
import { isAdmin, isStaff, isSuperAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/register',userRegisterController)
router.post('/mail',mailController)
router.post('/verification',verificationController )
router.post('/login',loginController)
router.post('/forget',forgetController)
router.post('/resetPassword',resetPasswordController)


router.get("/staff-auth", requireSignIn,isStaff, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
    //protected Admin route auth
    router.get("/superAdmin-auth", requireSignIn, isSuperAdmin, (req, res) => {
      res.status(200).send({ ok: true });
    });

export default router
