import bankTransactionModel from "../models/bankTransactionModel.js";
import bankDepositIntoModel from "../models/bankDepositIntoModel.js";
import CashWithdrawfromBankModel from "../models/CashWithdrawfromBankModel.js";
import bankModel from "../models/bankModel.js";
import mongoose from "mongoose";
import { isValidObjectId } from 'mongoose';

export const bankToBankTransferController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { date, contraNo, fromAccount, amount, toAccount } = req.body;

    // Check for required fields
    const requiredFields = ["date", "contraNo", "fromAccount", "amount", "toAccount"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Required fields are missing",
        missingFields,
      });
    }

    // Validate accounts
    if (fromAccount === toAccount) {
      return res.status(400).send({ success: false, message: "Do not select the same bank account" });
    }

    if (!isValidObjectId(fromAccount) || !isValidObjectId(toAccount)) {
      return res.status(400).send({ success: false, message: "Both fromAccount and toAccount must be valid Object IDs" });
    }

    // Fetch bank account details
    const fromB = await bankModel.findById(fromAccount).session(session);
    const toB = await bankModel.findById(toAccount).session(session);

    if (!fromB) {
      return res.status(404).send({ success: false, message: "fromAccount not found" });
    }
    if (!toB) {
      return res.status(404).send({ success: false, message: "toAccount not found" });
    }

    const amountNum = Number(amount);  // Ensure the amount is a number

    // Check for valid and sufficient balance
    if (amountNum <= 0) {
      return res.status(400).send({ success: false, message: "Amount must be greater than zero" });
    }

    const fromBalanceNum = Number(fromB.openingBalance);
    if (amountNum > fromBalanceNum) {
      return res.status(400).send({ success: false, message: "Insufficient amount in Bank" });
    }

    // Calculate new balances
    const newFromBalance = fromBalanceNum - amountNum;
    const newToBalance = Number(toB.openingBalance) + amountNum;

    // Update balances atomically
    const tr1 = await bankModel.findByIdAndUpdate(
      fromAccount, 
      { openingBalance: newFromBalance }, 
      { new: true, session }
    );

    const tr2 = await bankModel.findByIdAndUpdate(
      toAccount, 
      { openingBalance: newToBalance }, 
      { new: true, session }
    );

    if (!tr1 || !tr2) {
      await session.abortTransaction();
      return res.status(400).send({ success: false, message: "Transaction failed" });
    }

    // Create the transaction record
    const response = await bankTransactionModel.create(
      [{ date, contraNo, fromAccount, amount: amountNum, toAccount }],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).send({
      success: true,
      message: "Bank to Bank Transfer Successful",
      response,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction Error:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
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


