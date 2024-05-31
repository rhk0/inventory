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
    },
    email: {
      type: String,
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
    // another filed for UPLOAD PHOTO UPLOAD AADHAR CARD UPLOAD PAN CARD

    photo: {
      data: Buffer,
      contentType: String,
    },
    adharCard: {
      data: Buffer,
      contentType: String,
    },
    panCard: {
      data: Buffer,
      contentType: String,
    },
    

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
