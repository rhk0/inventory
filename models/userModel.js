import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    businessName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    businessType:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})

export default mongoose.model("user",userSchema)