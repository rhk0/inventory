import mongoose from "mongoose";

const SalesEstimateSchema = new mongoose.Schema({
  date: { type: String },
  estimateNo: { type: String },
  salesType: { type: String },
  customerType: { type: String },
  customerName: { type: String },
  placeOfSupply: { type: String },
  paymentTerm: { type: String },
  dueDate: { type: String },
  receiptDocNo: { type: String },
  dispatchedThrough: { type: String },
  destination: { type: String },
  carrierNameAgent: { type: String },
  billOfLading: { type: String },
  motorVehicleNo: [{ type: String }],
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
      discount: { type: Number },
      cgst: { type: Number },
      sgst: { type: Number },
      igst: { type: Number },
      totalValue: { type: Number },
    },
  ],
  otherChargesDescriptions:{type :String},
  grossAmount:{type :String},
  totalGstAmount:{type :String},
  otherCharges:{type :String},
  netAmount:{type :String},
});

export default mongoose.model("SalesEstimateSchema", SalesEstimateSchema);
