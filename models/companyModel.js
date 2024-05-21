import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {

    photo: {
      data: Buffer,
      contentType: String,
    },
    
    businessName: {
      type: String,
      required: true,
    },
    printName: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    b_state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    financialYear: {
      type: String,
      required: true,
    },
    bookFrom: {
      type: Date,
      required: true,
    },
    // s_state: {
    //   type: String,
    //   // required: true,
    // },
    tax_Rate: {
      type: String,
      // required: true,
    },
    gstIn: {
      type: String,
      // required: true,
    },
    e_way_bill: {
      type: String,
      required: true,
    },
    periodicalReturn: {
      type: String,
      // required: true,
    },

    selectBank: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    irfcCode: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: true,
    },
    enableBatch: {
      type: String,
      required: true,
    },
    enableExpire: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
