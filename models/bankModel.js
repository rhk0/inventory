import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },

  ifscCode:{
    type:String,
  },
  accountNumber:{
    type:String,
  },
  openingBalance:{
    type:String,
  },
  drCr: {
    type: String,
    enum: ['Dr', 'Cr'],
  }
}, {
  timestamps: true,
});

export default mongoose.model("Bank", bankSchema);
