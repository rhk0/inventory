import mongoose from "mongoose";

const payOutSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: String },
    paymentNo: { type: String },
    supplierName: { type: String },
    paymentMode: { type: String },
    selectedBank:{type:String},
    method:{type:String},
    transactionCheque:{type:String},
    rows: [
      {
        invoiceNo: { type: String },
        invoiceAmount: { type: String },
        paymentAmount: { type: Number },
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

export default mongoose.model("payOut", payOutSchema);
