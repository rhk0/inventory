import companyModel from "../models/companyModel.js";
import fs from "fs";


export const registerController = async (req, res) => {
  try {
    
    const {
      businessName,
      printName,
      businessType,
      address,
      b_state,
      country,
      pinCode,
      contact,
      email,
      website,
      financialYear,
      bookFrom,
      // s_state,
      tax_Rate,
      gstIn,
      e_way_bill,
      periodicalReturn,

      selectBank,
      accountName,
      accountNumber,
      irfcCode,
      upiId,
      enableBatch,
      enableExpire,
    } = req.fields;

    const { photo } = req.files;

    let photoData = null;

    if (photo) {
      console.log(photo,"thjis fijfoisdfjkoj ")
      photoData = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    const requiredFields = [
      "businessName",
      "printName",
      "businessType",
      "address",
      "b_state",
      "country",
      "pinCode",
      "contact",
      "email",
      "website",
      "financialYear",
      "bookFrom",
      "e_way_bill",
      // "periodicalReturn",

      "selectBank",
      "accountName",
      "accountNumber",
      "irfcCode",
      "upiId",
      "enableBatch",
      "enableExpire",
    ];

    const missingFields = requiredFields.filter((field) => !req.fields[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const old = await companyModel.findOne({ businessName });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This business already exists",
      });
    }

    const data = await companyModel.create({
      photo: photoData,
      businessName,
      printName,
      businessType,
      address,
      b_state,
      country,
      pinCode,
      contact,
      email,
      website,
      financialYear,
      bookFrom,
      // s_state,
      tax_Rate,
      gstIn,
      e_way_bill,
      periodicalReturn,
      selectBank,
      accountName,
      accountNumber,
      irfcCode,
      upiId,
      enableBatch,
      enableExpire,
    });

    return res.status(201).send({
      success: true,
      message: "Company registration successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
