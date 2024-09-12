import express from "express";
import {
  createincomeController,
  manageincomeController,
  deleteincomeController,
  updateincomeController,
} from "../controllers/incomeController.js";

const router = express.Router();

// Create a new income
router.post("/create", createincomeController);

// Get all income
router.get("/manageallincome", manageincomeController);

// Delete an income by ID
router.delete("/delete/:_id", deleteincomeController);

// Update an income by ID
router.put("/update/:_id", updateincomeController);

export default router;
