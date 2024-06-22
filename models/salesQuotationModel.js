import mongoose from "mongoose";

const salesquotationSchema = new mongoose.Schema({
  date: { type: Date },
  quotationNo: { type: String },
  selectCustomer: { type: String },
  reverseCharge: { type: String },
  placeOfSupply: { type: String },
  paymentsTerms: { type: String },
  dueDtae: { type: String },
  taxType: { type: String },
  billingAddress: { type: String },
  shippingAddress: { type: String }, 
  rows: [
    {
      itemCode: String,
      itemName: String,
      hsnCode: String,
      qty: Number,
      rate: Number,
      cgst: Number,
      sgst: Number,
      igst: Number,
      total: Number,
    },
  ],
  taxAmount:{type:Number},
  totalAmount:{type:Number},

});

export default mongoose.model("salesquotation", salesquotationSchema);
