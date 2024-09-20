import mongoose from "mongoose";

const deliveryChallanSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: String },
    salesType: { type: String },
    challanNo: { type: String },
    customerName: { type: String },
    placeOfSupply: { type: String },
    paymentTerm: { type: String },
    dueDate: { type: String },
    dispatchedThrough: { type: String },
    destination: { type: String },
    carrierNameAgent: { type: String },
    billOfLading: { type: String },
    billingAddress: { type: String },
    reverseCharge: { type: String },
    gstType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsnCode: { type: String },
        qty: { type: Number },
        units: { type: String },
        mrp: { type: Number },
        discountpercent: { type: Number },
        discountRS: { type: Number },
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
    otherChargesDescriptions: { type: String },
    otherCharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("deliveryChallan", deliveryChallanSchema);
