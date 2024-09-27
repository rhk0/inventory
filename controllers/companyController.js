import companyModel from "../models/companyModel.js";
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

export const registerController = async (req, res) => {
  try {
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
        businessName,
        address,
        country,
        state,
        pinCode,
        email,
        website,
        contact,
        financialYear,
        bookFrom,
        enable_gst,
        s_state,
        registration_Type,
        tax_Rate,
        gstIn,
        drug_licence_no,
        othertax,
        tax_name,
        number,
        bank_name,
        bank_addess,
        ifce_code,
        account_holder_name,
        accountNumber,
        upiId
      } = req.body;
        
      const { _id } = req.user;
      
      const photo = req.file ? req.file.path.replace(`${uploadDir}`, "") : null;



      // Check if the business already exists
      const old = await companyModel.findOne({ businessName,email });
      if (old) {
        return res.status(400).send({
          success: false,
          message: "This business already exists",
        });
      }

      // Create a new company with the uploaded image
      const data = await companyModel.create({
        admin: _id,
        photo, // Only relative path is saved here
        businessName,
        address,
        country,
        state,
        pinCode,
        email,
        website,
        contact,
        financialYear,
        bookFrom,
        enable_gst,
        s_state,
        registration_Type,
        tax_Rate,
        gstIn,
        drug_licence_no,
        othertax,
        tax_name,
        number,
        bank_name,
        bank_addess,
        ifce_code,
        account_holder_name,
        accountNumber,
        upiId
      });

      return res.status(201).send({
        success: true,
        message: "Company registration successful",
        data,
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const getController = async (req, res) => {
  try {
    const{admin}=req.params;
    const data = await companyModel.findOne({admin});
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No company data found',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Company data retrieved successfully',
      data,
    });
  } catch (error) {
    console.log('Error fetching company data:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
};

