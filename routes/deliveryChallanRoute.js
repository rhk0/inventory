import express from "express";
import {
  createChallanController,
  deletChallanByIDController,
  getAllChallanByIdController,
  getAllChallanCOntroller,
  updateChallanByIDController,
} from "../controllers/deliveryChallanController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createchallan",isAdmin,requireSignIn, createChallanController);
router.get("/getAllchallan", getAllChallanCOntroller);
router.get("/getchallanById/:_id", getAllChallanByIdController);
router.put("/updatechallan/:_id", updateChallanByIDController);
router.delete("/deletechallan/:_id", deletChallanByIDController);
export default router;
