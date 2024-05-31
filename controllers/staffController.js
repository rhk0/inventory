import staffModel from "../models/staffModel.js";
import fs from "fs";
export const createstaffController = async (req, res) => {
  try {
    const {
      name,
      contact,
      address,
      state,
      fatherName,
      motherName,
      email,
      empId,
      designation,
      department,
      adharCardNo,
      panNo,
      drivingLicence,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      salaryAmount,
    } = req.fields;

    const { photo, adharCard, panCard } = req.files;

    let photoData = null;
    let adharcardData = null;
    let pancardData = null;

    if (photo) {
      photoData = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }
    if (adharCard) {
      adharcardData = {
        data: fs.readFileSync(adharCard.path),
        contentType: adharCard.type,
      };
    }
    
    if (panCard) {
      pancardData = {
        data: fs.readFileSync(panCard.path),
        contentType: panCard.type,
      };
    }

    const requiredFields = [
      "name",
      "contact",
      "address",
      "state",
      "fatherName",
      "motherName",
      "email",
      "empId",
      "designation",
      "department",
      "adharCardNo",
      "panNo",
      "drivingLicence",
      "bankName",
      "accountNumber",
      "ifscCode",
      "accountHolderName",
      "salaryAmount",
    ];
    const missingFields = requiredFields.filter((field) => !req.fields[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    const old = await staffModel.findOne({ email });
    if (old) {
      return res.status(400).send({
        success: false,
        message: "This staff already exists",
      });
    }
    const data = await staffModel.create({
      photo: photoData,
      adharCard: adharcardData,
      panCard: pancardData,
      name,
      contact,
      address,
      state,
      fatherName,
      motherName,
      email,
      empId,
      designation,
      department,
      adharCardNo,
      panNo,
      drivingLicence,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      salaryAmount,
    });
    return res.status(201).send({
      success: true,
      message: "staff Create successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


export const manageStaffController = async (req, res) => {
  try {
    const data = await staffModel.find();
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const deleteStaffController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await staffModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Staff not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Staff deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const manageSingleStaffController = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await staffModel.find({ _id });
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Staff Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};