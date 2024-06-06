import mongoose from "mongoose";

const cashSchema = new mongoose.Schema({
  name: {
    type: String  
  },
  drCr: {
    type: String,
    enum: ['Dr', 'Cr'],
  }
}, {
  timestamps: true,
});

export default mongoose.model("Cash", cashSchema);
