import purchesInvoiceModel from "../models/purchesInvoiceModel.js";
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
    const filetypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|jpg|jpeg|png|gif|bmp|tiff|svg/i;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only PDFs, DOCs, JPGs, and PNGs are allowed!");
  }
}
// Create Purchase Invoice Controller with File Upload
export const createPurchaseInvoiceController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    try {
      const {
        date,
        invoiceNo,
        supplierInvoiceNo,
        purchaseType,
        supplierName,
        placeOfSupply,
        paymentTerm,
        dueDate,
        receiptDocNo,
        dispatchedThrough,
        destination,
        carrierNameAgent,
        billOfLading,
        motorVehicleNo,
        billingAddress,
        reverseCharge,
        gstType,
       // rows, // Array of row objects
        otherChargesDescription,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
      } = req.body;

      let rows;
      if (typeof req.body.rows === 'string') {
        rows = JSON.parse(req.body.rows);
      } else {
        rows = req.body.rows;
      }
      const { _id } = req.user; 

      const newInvoice = new purchesInvoiceModel({
        admin: _id,
        date,
        invoiceNo,
        supplierInvoiceNo,
        purchaseType,
        supplierName,
        placeOfSupply,
        paymentTerm,
        dueDate,
        receiptDocNo,
        dispatchedThrough,
        destination,
        carrierNameAgent,
        billOfLading,
        motorVehicleNo,
        billingAddress,
        reverseCharge,
        gstType,
        rows, // Save rows as an array
        otherChargesDescription,
        otherCharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
        documentPath: req.file ? req.file.path : null, // Store document path if uploaded
      });

      const savedInvoice = await newInvoice.save();

      return res.status(201).json({
        message: "Purchase Invoice created successfully",
        invoice: savedInvoice,
      });
    } catch (error) {
      console.error("Error creating purchase invoice:", error);
      res.status(500).json({
        error: "Server error",
        message: error.message,
      });
    }
  });
};
export const getAllPurchaseInvoiceController = async (req, res) => {
  try {
    const invoices = await purchesInvoiceModel.find();

    if (!invoices.length) {
      return res.status(404).json({
        success: false,
        message: "No purchase invoices found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase invoices retrieved successfully",
      invoices,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
export const getPurchaseInvoiceByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const invoice = await purchesInvoiceModel.findById(_id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Purchase invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase invoice found",
      invoice,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
export const deletePurchaseInvoiceByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedInvoice = await purchesInvoiceModel.findByIdAndDelete(_id);

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        message: "Purchase invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase invoice deleted successfully",
      deletedInvoice,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
export const updatePurchaseInvoiceByIdController = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      try {
        const { _id } = req.params;
        const updateData = req.body;
  
        const invoice = await purchesInvoiceModel.findById(_id);
        if (!invoice) {
          return res.status(404).json({
            success: false,
            message: "Purchase invoice not found",
          });
        }
  
        // Parse the rows array if it's sent as a string
        if (typeof updateData.rows === 'string') {
          updateData.rows = JSON.parse(updateData.rows);
        }
  
        // Update fields in the invoice
        Object.assign(invoice, updateData);
  
        if (req.file) {
          invoice.documentPath = req.file.path; // Update document path if a new file is uploaded
        }
  
        const updatedInvoice = await invoice.save();
  
        res.status(200).json({
          success: true,
          message: "Purchase invoice updated successfully",
          updatedInvoice,
        });
      } catch (error) {
        console.error("Error updating purchase invoice:", error);
        res.status(500).json({
          error: "Server error",
          message: error.message,
        });
      }
    });
  };
  