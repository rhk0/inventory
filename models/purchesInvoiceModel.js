import mongoose from "mongoose";

const purchesInvoiceSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    purchaseType: { type: String },
    date: { type: String },
    invoiceNo:{type:String},
    supplierInvoiceNo: { type: String },
    supplierName: { type: String },
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

export default mongoose.model("purchesInvoice", purchesInvoiceSchema);