import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema(
  {
    //business Details
    businessName: {
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
    //statutory Details

    s_state: {
      type: String,
    },
    tax_Rate: {
      type: String,
    },
    taxable_value: {
      type: String,
    },
    gstIn: {
      type: String,
      required: true,
    },
    e_way_bill: {
type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("company", CompanySchema);
