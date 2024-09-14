import express from "express";
import {
  createChallanController,
  deletChallanByIDController,
  getAllChallanByIdController,
  getAllChallanCOntroller,
  updateChallanByIDController,
} from "../controllers/deliveryChallanController.js";

const router = express.Router();

router.post("/createchallan", createChallanController);
router.get("/getAllchallan", getAllChallanCOntroller);
router.get("/getchallanById/:_id", getAllChallanByIdController);
router.put("/updatechallan/:_id", updateChallanByIDController);
router.delete("/deletechallan/:_id", deletChallanByIDController);
export default router;
