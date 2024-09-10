import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    expenseNo: {
      type: String,
      required: true,
    },
    expenseType: {
      type: String,
      required: true,
    },
    gstType: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    expense: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    gstRate: {
      type: Number,
      required: true,
    },
    cgstAmount: {
      type: Number,
      required: true,
    },
    sgstAmount: {
      type: Number,
      required: true,
    },
    igstAmount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    narration: {
      type: String,
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Expense", ExpenseSchema);
