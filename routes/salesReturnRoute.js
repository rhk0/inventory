import express, { request } from "express";
import {
  createReturnController,
  deletReturnByIDController,
  getAllReturnByIdController,
  getAllReturnCOntroller,
  updateReturnByIDController,
} from "../controllers/salesReturnController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/createsalesreturn",
  requireSignIn,
  isAdmin,
  createReturnController
);
router.get("/getAllreturn", getAllReturnCOntroller);
router.get("/getAllreturnById/:_id", getAllReturnByIdController);
router.put("/updatereturn/:_id", updateReturnByIDController);
router.delete("/deletereturn/:_id", deletReturnByIDController);

export default router;
