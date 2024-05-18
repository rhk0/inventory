import mongoose from "mongoose";
const dkSchema= new mongoose.Schema({
 
 email:{
   type:String,
   required:true,
   lowercase:true,
 },
    otp:{
    type:String,
    required:true,
 }
},{
    timestamps:true,
})

export default mongoose.model("dk",dkSchema)