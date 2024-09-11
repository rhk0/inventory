import staffModel from "../models/staffModel.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "./uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          `Error: Invalid file type! Only images are allowed. Your file type: ${file.mimetype}`
        )
      );
    }
  },
}).single("photo"); // Ensure this matches the name attribute in the frontend

// Create Staff Controller
export const createstaffController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ error: "Multer error", message: err.message });
      } else if (err) {
        return res
          .status(400)
          .send({ error: "File upload error", message: err.message });
      }
      const {
        name,
        contact,
        address,
        pinCode,
        state,
        fatherName,
        email,
        password,
      } = req.body;

      const photo = req.file ? req.file.path.replace(`${uploadDir}`, "") : null;
      // Create new staff member
      const newStaff = await staffModel.create({
        photo,
        name,
        contact,
        address,
        pinCode,
        state,
        fatherName,
        email,
        password,
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
