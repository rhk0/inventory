import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../middleware/authHelper.js";
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

    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.send({ message: "user already exist" });
    }
    
    const hashedPwd = await hashPassword(password);
    const data = await userModel.create({
      businessName,
      userName,
      address,
      contact,
      email,
      password:hashedPwd,
      businessType,
    });
    if (data) {
      res.status(201).send({
        success: true,
        message: "User Registration Successfull!",
        data,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "internal issue",
      error,
    });
  }
};
