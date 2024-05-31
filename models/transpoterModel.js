import mongoose from "mongoose";

const transpoterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    registrationType: {
      type: String,
    },
    gstIn: {
      type: String,
    },
    panNo: {
      type: String,
    },
    bankName: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    accountNo: {
      type: String,
    },
    accountHolder: {
      type: String,
    },
    upiId: {
      type: String,
    },

    dispatchDocNo: {
      type: String,
    },
    dispatchThrough: {
      type: String,
    },
    destination: {
      type: String,
    },

    billOfLading: {
      type: String,
    },
    date: {
      type: String,
    },
    vehicaleNo: {
      type: String,
    },

    openingBalance: {
      type: String,
    },
    drCr: {
      type: String,
      enum: ["Dr", "Cr"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transpoter", transpoterSchema);
