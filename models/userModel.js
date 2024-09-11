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
    }
},{
    timestamps:true,
})

export default mongoose.model("user",userSchema)