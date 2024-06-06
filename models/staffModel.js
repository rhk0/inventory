import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    adharCardNo: {
      type: String,
      required: true,
    },
    panNo: {
      type: String,
      required: true,
    },
    drivingLicence: {
      type: String,
      required: true,
    },
    photo: fileSchema,
    adharCards: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    panCard: fileSchema,
    bankName: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    salaryAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Staff", staffSchema);
