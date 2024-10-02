import purchesReturnModel from "../models/purchesReturnModel.js";
import multer from "multer";
import path from "path";

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit: 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("documentPath"); // Change to match the field in your form

// Check file type for upload
function checkFileType(file, cb) {
  const filetypes =
    /pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|jpg|jpeg|png|gif|bmp|tiff|svg/i;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only PDFs, DOCs, JPGs, and PNGs are allowed!");
  }
}

// Create Purchase Return Controller with File Upload
export const createPurchaseReturnController = async (req, res) => {
  // Log incoming files and fields for debugging

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    try {
      const {
        date,
        debitNoteNo,
        paymentTerm,
        dueDate,
        supplierName,
        billingAddress,
        selectPurchase,
        reasonForReturn,
        gstType,
        rows,
        otherChargesDescriptions,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
      } = req.body;

      let parsedRows;
      if (typeof rows === "string") {
        parsedRows = JSON.parse(rows);
      } else {
        parsedRows = rows;
      }

      const newReturn = new purchesReturnModel({
        admin: req.user._id,
        date,
        debitNoteNo,
        paymentTerm,
        dueDate,
        supplierName,
        billingAddress,
        selectPurchase,
        reasonForReturn,
        gstType,
        rows: parsedRows,
        otherChargesDescriptions,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
        documentPath: req.file ? req.file.path : null,
      });

      const savedReturn = await newReturn.save();

      return res.status(201).json({
        message: "Purchase Return created successfully",
        purchaseReturn: savedReturn,
      });
    } catch (error) {
      console.error("Error creating purchase return:", error);
      res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  });
};

export const getAllPurchaseReturnController = async (req, res) => {
  try {
    const returns = await purchesReturnModel.find();

    if (!returns.length) {
      return res.status(404).json({
        success: false,
        message: "No purchase returns found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase returns retrieved successfully",
      returns,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const getPurchaseReturnByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const purchaseReturn = await purchesReturnModel.findById(_id);

    if (!purchaseReturn) {
      return res.status(404).json({
        success: false,
        message: "Purchase return not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase return found",
      purchaseReturn,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const deletePurchaseReturnByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedReturn = await purchesReturnModel.findByIdAndDelete(_id);

    if (!deletedReturn) {
      return res.status(404).json({
        success: false,
        message: "Purchase return not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase return deleted successfully",
      deletedReturn,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const updatePurchaseReturnByIdController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    try {
      const { _id } = req.params;
      const updateData = req.body;

      const purchaseReturn = await purchesReturnModel.findById(_id);
      if (!purchaseReturn) {
        return res.status(404).json({
          success: false,
          message: "Purchase return not found",
        });
      }

      // Parse the rows array if it's sent as a string
      if (typeof updateData.rows === "string") {
        updateData.rows = JSON.parse(updateData.rows);
      }

      // Update fields in the purchase return
      Object.assign(purchaseReturn, updateData);

      if (req.file) {
        purchaseReturn.documentPath = req.file.path; // Update document path if a new file is uploaded
      }

      const updatedReturn = await purchaseReturn.save();

      res.status(200).json({
        success: true,
        message: "Purchase return updated successfully",
        updatedReturn,
      });
    } catch (error) {
      console.error("Error updating purchase return:", error);
      res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  });
};
