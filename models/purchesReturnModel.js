import mongoose from "mongoose";

const purchesReturnSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    supplierName: { type: String },
    date: { type: String },
    debitNoteNo:{type:String},  
    paymentTerm: { type: String },
    dueDate: { type: String },
    billingAddress: { type: String },
    selectPurchase: { type: String },
    reasonForReturn: { type: String },
    taxType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsn: { type: String },
        uom: { type: Number },
        qty: { type: Number },
        freeQty:{type:String},
        mrp: { type: Number },
        unitCost: { type: Number },
        schemeMargin: { type: String },
        discountpercent: { type: Number },
        discountRs: { type: Number },
        taxable: { type: Number },
        cgstpercent: { type: Number },
        cgstRS: { type: Number },
        sgstpercent: { type: Number },
        sgstRS: { type: Number },
        igstpercent: { type: Number },
        igstRS: { type: Number },
        totalValue: { type: Number },
      },
    ],
    otherChargesDescription: { type: String },
    otherCharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
    documentPath: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("purchesReturn", purchesReturnSchema);
