import express from "express";
import {
  createExpenseController,
  manageExpenseController,
  deleteExpenseController,
  updateExpenseController,
} from "../controllers/expenseControlller.js";

const router = express.Router();

// Create a new expense
router.post("/create", createExpenseController);

// Get all expenses
router.get("/manageallexpenses", manageExpenseController);

// Delete an expense by ID
router.delete("/delete/:_id", deleteExpenseController);

// Update an expense by ID
router.put("/update/:_id", updateExpenseController);

export default router;
