import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
 admin:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user",
   required:true,   
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
