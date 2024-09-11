import mongoose from "mongoose";
const subPayment = new mongoose.Schema(
  {
    
    paymentMode: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
    },
    invoiceNo: {
      type: Number,
    }, 
    plan: [],
    razorpay: {
      orderId: {
        type: String,
        default: "",
      },
      paymentId: {
        type: String,
        default: "",
      },
      signature: {
        type: String,
        default: "",
      },
    },
    tcManager: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("subPayment", subPayment);
