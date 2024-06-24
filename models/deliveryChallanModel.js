import mongoose from "mongoose";

const deliveryChallanSchema = new mongoose.Schema({
  date: { type: Date }, 
  challanNo: { type: String },
  selectCustomer: { type: String },
  reverseCharge: { type: String },
  placeOfSupply: { type: String },
  paymentsTerms: { type: String },
  dueDate: { type: String },
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


});

export default mongoose.model("deliveryChallan", deliveryChallanSchema);
