import bankTransactionModel from "../models/bankTransactionModel.js";
import bankDepositIntoModel from "../models/bankDepositIntoModel.js";
import CashWithdrawfromBankModel from "../models/CashWithdrawfromBankModel.js";
import bankModel from "../models/bankModel.js";

import { isValidObjectId } from 'mongoose';
export const bankToBankTransferController = async (req, res) => {
  try {
    const { date, contraNo, fromAccount, amount, toAccount } = req.body;

    
    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
 
     if(!isValidObjectId(fromAccount)){

      return res.status(404).send({success:false,message:"fromAccount must be a valid object id "})
     }
     if(!isValidObjectId(toAccount)){

      return res.status(404).send({success:false,message:"toAccount must be a valid object id "})
     }
    
     const fromB = await bankModel.findById(fromAccount)
     if(!fromB){
      return res.status(404).send({success:false,message:"fromAccount not found "})
     }
     const toB = await bankModel.findById(toAccount)
     if(!toB){
      return res.status(404).send({success:false,message:"toAccount  not found "})
     }
     console.log(amount,fromB.openingBalance)
    
     if(amount<=fromB.openingBalance){ 
      let newAmt = Number(fromB.openingBalance) -  Number(amount)
      let newAmt2 = Number(toB.openingBalance) + Number(amount)
      const tr1 = await bankModel.findByIdAndUpdate(fromAccount,{openingBalance:newAmt},{new:true})

      const tr2 = await bankModel.findByIdAndUpdate(toAccount,{openingBalance:newAmt2},{new:true})
      console.log(tr1,tr2)
     }
     if(amount> fromB.openingBalance){
      return res.status(404).send({success:false,message:"Insufficient amount in Bank"})       
     }

    const response = await bankTransactionModel.create({
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });


    if (response) {
      return res.status(201).send({
        success: true,
        message: "Bank to Bank Transfer Successfull",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const CashDepositeIntoBankController = async (req, res) => {
  try {
    const { date, contraNo, fromAccount, amount, toAccount } = req.body;
    const response = await bankDepositIntoModel.create({
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });

    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Cash Deposit  Into Bank Successfull",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const CashWithdrawfromBankController = async (req, res) => {
  try {
    const { date, contraNo, fromAccount, amount, toAccount } = req.body;
    const response = await CashWithdrawfromBankModel.create({
      date,
      contraNo,
      fromAccount,
      amount,
      toAccount,
    });

    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Cash Deposit  Into Bank Successfull",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
