import mongoose from "mongoose";


const staffSchema = new mongoose.Schema(
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
    state: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    empId: {
      type: String,

      unique: true,
    },
    email: {
      type: String,

      unique: true,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    adharCardNo: {
      type: String,
    },
    panNo: {
      type: String,
    },
    drivingLicence: {
      type: String,
    },
    photo: [
      {
        type: String,
      },
    ],
    panCard: [
      {
        type: String,
      },
    ],

    adharCards: [
      {
        type: String,
      },
    ],

    bankName: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
    salaryAmount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Staff", staffSchema);
