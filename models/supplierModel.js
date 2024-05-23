import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
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
  itemCategories: {
    type: String,
  },
  discountPercentage: {
    type: Number,
  },
  discountAmount: {
    type: Number,
  },
  openingBalance: {
    type: Number,
  },
  drCr: {
    type: String,
    enum: ['Dr', 'Cr'],
  }
}, {
  timestamps: true,
});

export default mongoose.model("Supplier", supplierSchema);
