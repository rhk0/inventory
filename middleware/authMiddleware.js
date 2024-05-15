import  jsonwebtoken  from "jsonwebtoken";


import userModel from "../models/userModel.js";


export const requirSignIn = async(req,res,next)=>{
    try {
        const decode = JWT.verify(req.header.authorization,process.env.JWT_SECRET)
        req.user= decode;
        next();

    } catch (error) {
        return res.status(401).send({message:"UnAuthorized"})
        
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,message:"UnAuthorized"
            })
        }
        else{
            next();
        }
    } catch (error) {
        res.status(500).send({success:false,message:"internal server issue",error})
        
    }
}