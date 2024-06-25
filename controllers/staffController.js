import staffModel from "../models/staffModel.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit per file
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).fields([
  { name: "photo", maxCount: 10 }, // Adjust maxCount as needed
  { name: "panCard", maxCount: 10 },
  { name: "adharCards", maxCount: 10 },
]);

export const createstaffController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).send({ error: "Multer error", message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res.status(500).send({ error: "Server error", message: err.message });
      }

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
      } = req.body;

      const photo = req.files.photo ? req.files.photo.map((file) => file.path) : [];
      const panCard = req.files.panCard ? req.files.panCard.map((file) => file.path) : [];
      const adharCards = req.files.adharCards ? req.files.adharCards.map((file) => file.path) : [];

      const existingStaff = await staffModel.findOne({
        $or: [{ email }, { empId }],
      });

      if (existingStaff) {
        return res.status(400).send({
          success: false,
          message: "This staff already exists with the provided email or empId",
        });
      }

      const newStaff = await staffModel.create({
        photo,
        panCard,
        adharCards,
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
        message: "Staff created successfully",
        data: newStaff,
      });
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
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

