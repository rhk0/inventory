import userModel from "../models/userModel.js";
import nodemailer from "nodemailer"
import { hashPassword, comparePassword } from "../middleware/authHelper.js";
import dkmodel from "../models/dkmodel.js";

import JWT from "jsonwebtoken"
export const userRegisterController = async (req, res) => {
  try {
    const {
      businessName,
      userName,
      address,
      contact,
      email,
      password,
      businessType,
    } = req.body;


    const requiredField = [
      "businessName",
      "userName",
      "address",
      "contact",
      "email",
      "password",
      "businessType",
    ];

    const missingFields = [];

    for (const field of requiredField) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields,
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if(password.length<6){
        return res.send({success:false,message:"password must be 6 digit"})
    }

    // otp

    function generateStrongOTP() {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let otp = '';
      for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          otp += characters[randomIndex];
      }
      return otp;
  }
  
  let otp = generateStrongOTP();
  const message = "Your OTP for verification is " + otp +" Please use this code to complete your Registration. Do not share it. ~dharma ";
  let transporter = nodemailer.createTransport({
      service:"Gmail",  
      auth:{
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
      }
  })
// check old user 
  const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.send({ message: "user already exist" });
    } 



  const subject = "OTP verification from accounting"
  let info = await transporter.sendMail({
      from :`Accounting Master <manasvistaff.dharma@gmail.com>`,
      to:email,
      subject:subject,
      text:message
  })
   const exotp = await  dkmodel.findOne({email})
  
   if(exotp){
    
    const r =  await dkmodel.findOneAndDelete({email})
   
   }
  await dkmodel.create({otp,email})
    //end otp
    
    const hashedPwd = await hashPassword(password);
    const data = await userModel.create({
      businessName,
      userName,
      address,
      contact,
      email,
      password:hashedPwd,
      businessType,
      verificationStatus:false,
    });
    if (data) {
      res.status(201).send({
        success: true,
        message: "User Registration Completed Successfully!",
        data,
      });
    }
  } catch (error) {
    

    return res.status(500).send({
      success: false,
      message: "internal server  issue...!",
      error,
    });
  }
};


export const verificationController =async(req,res)=>{
  try {
    
    const {email,otp}=req.body;
    if(!otp || !email){
      return res.send({message:"enter both email and otp field"})
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
   
    const exuser = await userModel.findOne({email})
    if(!exuser){
      return res.send({success:false,message:"You are not a registered user "})
    }
    if(exuser){

     const ot = await dkmodel.findOne({email})
     if(!ot && exuser){
    console.log(" otp find ")
      return res.status(200).send({success:true,message:"already verified"})
      
     }
      if(ot){
      
      if(ot.otp===otp){
           const user = await userModel.findOneAndUpdate(
            {email},
            { verificationStatus:true},
            {new:true}
           )
           await dkmodel.findOneAndDelete({email})
        return res.send({success:true,message:"Verification completed Successfully",user})
      }
      return res.send({success:false,message:"Verification failed"})
      }
    }      
 
  } catch (error) {
    console.log(error)
    return res.status(500).send({success:false,message:"Internal server issue",error})
  }
}   

export const loginController = async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email  || !password){
      return res.send({success:false,message:"email and password both fields are required"})
    }
    const user = await userModel.findOne({email})
    if(user){
     const bpassword = await hashPassword(password)
     const matched = await comparePassword(password,user.password)
     const AccessToken = JWT.sign({_id: user._id},process.env.JWT_SECRET,{
      expiresIn:"3d",
     })

     if(!matched){
      return res.send({success:false,message:"invalide passwod please try...! Again "})
     }
     if(!user.verificationStatus){
      return res.send({success:false,message:"Your email verification is Pending....!"})
     }
  return res.send({success:true,message:"Login successfully",user,AccessToken})
    }
    if(!user){
      return res.send({success:false,message:"User Not Registered..!"})
    }
  
  } catch (error) {
    console.log(error)
    res.status(500).send({success:false,message:"internal server issue",error})
  }
}


