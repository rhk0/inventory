import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema({
  date: { type: Date }, 
  invoiceNo: { type: String },
  selectCustomer: { type: String },
  reverseCharge: { type: String },
  placeOfSupply: { type: String },
  paymentsTerms: { type: String },
  dueDtae: { type: String },
  taxType: { type: String },
  billingAddress: { type: String },
  shippingAddress: { type: String }, 
  customerType: { type: String }, 
  rows: [
    {
      itemCode: String,
      itemName: String,
      hsnCode: String,
      qty: Number,
      taxable:Number,
      rate: Number,
      cgst: Number,
      sgst: Number,
      igst: Number,
      total: Number,
    },
  ],
  subTotal:{type:Number},
  Charges:{type:Number},
  Discount:{type:Number},
  TaxAmount:{type:Number},

});

export default mongoose.model("salesinvoice", salesInvoiceSchema);
