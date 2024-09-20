import mongoose from "mongoose";

const payInSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: String },
    receiptNo: { type: String },
    selectCustomer: { type: String },
    receiptMode: { type: String },
    rows: [
      {
        billNo: { type: String },
        billAmount: { type: String },
        recievedAmount: { type: Number },
        balanceAmount: { type: Number },
      },
    ],
    total: { type: String },
    Narration: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("payIn", payInSchema);
