import supplierModel from "../models/supplierModel.js";
import fs from "fs";

export const createSupplierController = async (req, res) => {
  
  try {
    const {
      name,
      contact,
      address,
      pinCode,
      state,
      country,
      email,
      website,
      registrationType,
      gstIn,
      panNo,
      bankName,
      ifscCode,
      accountNo,
      accountHolder,
      upiId,
      itemCategories,
      discountPercentage,
      discountAmount,
      openingBalance,
      drCr,
    } = req.body;



    const requiredFields = [
      "name",
      "contact",
      "address",
      "pinCode",
      "state",
      "country",
      "email",
      "registrationType",
      "panNo",
      "drCr",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const old = await supplierModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This supplier already exists",
      });
    }

    const data = await supplierModel.create({
    
      name,
      contact,
      address,
      pinCode,
      state,
      country,
      email,
      website,
      registrationType,
      gstIn,
      panNo,
      bankName,
      ifscCode,
      accountNo,
      accountHolder,
      upiId,
      itemCategories,
      discountPercentage,
      discountAmount,
      openingBalance,
      drCr,
    });

    return res.status(201).send({
      success: true,
      message: "Supplier registration successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
