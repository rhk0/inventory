import mongoose from "mongoose";

const payInSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: String },
    receiptNo: { type: String },
    selectCustomer: { type: String },
    cash:{type:String},
    selectedBank: [
      {
        bankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" }, // Reference to the bank
        name: { type: String }, // e.g. "SBI"
        ifscCode: { type: String },
        accountNumber: { type: String },
        openingBalance: { type: String },
        drCr: { type: String }, // Debit or Credit
      },
    ],
    receiptMode: { type: String },

    selectBank: { type: String },
    method: { type: String },
    transactionCheckNo: { type: String },
    rows: [
      {
        billNo: { type: String },
        billAmount: { type: String },
        paidAmount:{type:String},
        recievedAmount: { type: Number },
        balanceAmount: { type: Number },
      },
    ],
    grandtotal: { type: String },
    Narration: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("payIn", payInSchema);
