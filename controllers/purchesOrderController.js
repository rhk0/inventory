import SalesInvoice from "../models/salesInvoiceModel.js";

export const createPurchesOrderController = async (req, res) => {
  try {
    const {
      userId,
      date,
      orderNo, // Make sure you're receiving this
      purchaseType, // Make sure you're receiving this
      supplierName, // Make sure you're receiving this
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
      rows,
      otherChargesDescription,
      otherCharges,
      narration,
      grossAmount,
      gstAmount,
      netAmount,
    } = req.body;

    // Creating a new sales invoice
    const newInvoice = new SalesInvoice({
      userId,
      date,
      orderNo, // Assign this correctly
      purchaseType, // Assign this correctly
      supplierName, // Assign this correctly
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
      rows,
      otherChargesDescription,
      otherCharges,
      narration,
      grossAmount,
      gstAmount,
      netAmount,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).send({
      message: "Sales Invoice created successfully",
      invoice: savedInvoice,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const getAllPurchesOrderController = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find();

    if (!invoices.length) {
      return res.status(404).send({
        success: false,
        message: "No sales invoices found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Sales invoices retrieved successfully",
      invoices,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const getAllPurchesOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await purchesOrderModel.findById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      invoice: response, // Named it `invoice` for clarity
    });
  } catch (error) {
    console.error("Error fetching sales invoice by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const getPurchesOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await SalesInvoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Sales invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales invoice found",
      invoice,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
export const deletePurchesOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await SalesInvoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).send({
        success: false,
        message: "Sales invoice not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Sales invoice deleted successfully",
      deletedInvoice,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const updatePurchesOrderByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const invoice = await SalesInvoice.findById(id);
    if (!invoice) {
      return res.status(404).send({
        success: false,
        message: "Sales invoice not found",
      });
    }

    // Update fields
    invoice.userId = updateData.userId || invoice.userId;
    invoice.date = updateData.date || invoice.date;
    invoice.orderNo = updateData.orderNo || invoice.orderNo;
    invoice.purchaseType = updateData.purchaseType || invoice.purchaseType;
    invoice.supplierName = updateData.supplierName || invoice.supplierName;
    invoice.placeOfSupply = updateData.placeOfSupply || invoice.placeOfSupply;
    invoice.paymentTerm = updateData.paymentTerm || invoice.paymentTerm;
    invoice.dueDate = updateData.dueDate || invoice.dueDate;
    invoice.receiptDocNo = updateData.receiptDocNo || invoice.receiptDocNo;
    invoice.dispatchedThrough =
      updateData.dispatchedThrough || invoice.dispatchedThrough;
    invoice.destination = updateData.destination || invoice.destination;
    invoice.carrierNameAgent =
      updateData.carrierNameAgent || invoice.carrierNameAgent;
    invoice.billOfLading = updateData.billOfLading || invoice.billOfLading;
    invoice.motorVehicleNo =
      updateData.motorVehicleNo || invoice.motorVehicleNo;
    invoice.billingAddress =
      updateData.billingAddress || invoice.billingAddress;
    invoice.reverseCharge = updateData.reverseCharge || invoice.reverseCharge;
    invoice.gstType = updateData.gstType || invoice.gstType;
    invoice.rows = updateData.rows || invoice.rows;
    invoice.otherChargesDescription =
      updateData.otherChargesDescription || invoice.otherChargesDescription;
    invoice.otherCharges = updateData.otherCharges || invoice.otherCharges;
    invoice.narration = updateData.narration || invoice.narration;
    invoice.grossAmount = updateData.grossAmount || invoice.grossAmount;
    invoice.gstAmount = updateData.gstAmount || invoice.gstAmount;
    invoice.netAmount = updateData.netAmount || invoice.netAmount;

    const updatedInvoice = await invoice.save();

    res.status(200).send({
      success: true,
      message: "Sales invoice updated successfully",
      updatedInvoice,
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
