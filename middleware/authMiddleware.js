import JWT from "jsonwebtoken"

import userModel from "../models/userModel.js"

export const requireSignIn=async(req,res,next)=>{
    try {
      
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
  
    req.user=decode;
    next();

    } catch (error) {
        return res.send({ message: "Unauthorized",error });
    }
}


//admin access
export const isAdmin=async(req,res,next)=>{
    try {
        console.log(req.user)

        const user=await userModel.findById(req.user._id)
      
        if(user.role!==1 ||  user.status!=="Active")
        {
             console.log(user)
            return res.status(401).send({success:false,message:"UnAuthorized Access U r not the AdminDharma...!"})
        }
        else{
            next();
        }
        
    }catch (error) {

        console.log(error)
        res.status(401).send({success:false,message:"You are not an Admin , UnAuthorized Access...!",error})
        
    }

}

//Super admin access
export const isSuperAdmin=async(req,res,next)=>{
    try {

        const user=await userModel.findById(req.user._id)
        
        if(user.role!==2)
        {
            return res.status(401).send({success:false,message:"UnAuthorized Access You Are not  Super Admin..!"})
        }
        else{
            next();
        }
        
    }catch (error) {

        console.log(error)
        res.status(401).send({success:false,message:"You are not an Super Admin , UnAuthorized Access...!",error})
        
    }

}
//staff access

export const isStaff =async(req,res,next)=>{
    try {

        const user=await userModel.findById(req.user._id)
        if(user.role!==0)
        {
            return res.status(401).send({success:false,message:"UnAuthorized Access U e not the AdminDharma...!"})
        }
        else{
            next();
        }
        
    }catch (error) {

      
        res.status(401).send({success:false,message:"You r not an Admin , UnAuthorized Access...!",error})
        
    }
}

