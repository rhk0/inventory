import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      
    },
    incomeNo: {
      type: String,
      
    },
    incomeType: {
      type: String,
      
    },
    gstType: {
      type: String,
      
    },
    vendor: {
      type: String,
      
    },
    income: {
      type: String,
      
    },
    amount: {
      type: Number,
      
    },
    gstRate: {
      type: Number,
      
    },
    cgstAmount: {
      type: Number,
      
    },
    sgstAmount: {
      type: Number,
      
    },
    igstAmount: {
      type: Number,
      
    },
    total: {
      type: Number,
      
    },
    narration: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Income", IncomeSchema);
