import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    businessName:{
        type:String,
       
    },
    userName:{
        type:String,
       
    },
    address:{
        type:String,
      
    },
    contact:{
        type:String,
       
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    businessType:{
        type:String,
       
    },
   
    role:{
        type:Number,
        required:true,
        default:0,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
      },
     paymentValidation:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"subscriptionPlan"
     },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      isFreeTrial: {
        type: Boolean,
        default: true,
      },
},{
    timestamps:true,
})

export default mongoose.model("user",userSchema)