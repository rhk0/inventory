import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

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
