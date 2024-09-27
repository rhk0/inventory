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

router.post("/createchallan",requireSignIn,isAdmin, createChallanController);
router.get("/getAllchallan",requireSignIn,isAdmin, getAllChallanCOntroller);
router.get("/getchallanById/:_id",requireSignIn,isAdmin, getAllChallanByIdController);
router.put("/updatechallan/:_id",requireSignIn,isAdmin, updateChallanByIDController);
router.delete("/deletechallan/:_id",requireSignIn,isAdmin, deletChallanByIDController);
export default router;
