import mongoose from "mongoose";
const banktransctionSchecma = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    contraNo: {
      type: String,
    },
    fromAccount: {
      type: String,
    },
    amount: {
      type: String,
    },
    toAccount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("BankTransaction", banktransctionSchecma);
