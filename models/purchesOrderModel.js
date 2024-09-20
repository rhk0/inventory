import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  
    date: { type: String },
    orderNo: { type: String, required: true }, 
    purchaseType: { type: String, required: true }, 
    supplierName: { type: String, required: true },
    placeOfSupply: { type: String },
    paymentTerm: { type: String },
    dueDate: { type: String },
    receiptDocNo: { type: String },
    dispatchedThrough: { type: String },
    destination: { type: String },
    carrierNameAgent: { type: String },
    billOfLading: { type: String },
    motorVehicleNo: { type: String },
    billingAddress: { type: String },
    reverseCharge: { type: String },
    gstType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsnCode: { type: String },
        qty: { type: Number },
        uom: { type: Number },
        mrp: { type: Number },
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
    othercharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("salesinvoice", salesInvoiceSchema);
