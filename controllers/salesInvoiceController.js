import salesInvoiceModel from "../models/salesInvoiceModel.js";

export const createSalesInvoiceController = async (req, res) => {
  try {
    const {
      userId,
      date,
      InvoiceNo,
      salesType,
      customerType,
      customerName,
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
      cash,
      bank,
      otherChargesDescription,
      othercharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    } = req.body;

    const requiredFields = [
      "userId",
      "date",
      "InvoiceNo",
      "salesType",
      "customerType",
      "customerName",
      "placeOfSupply",
      "paymentTerm",
      "dueDate",
      "receiptDocNo",
      "dispatchedThrough",
      "destination",
      "carrierNameAgent",
      "billOfLading",
      "motorVehicleNo",
      "billingAddress",
      "reverseCharge",
      "gstType",
      "rows",
     
      "otherChargesDescription",
      "othercharges",
      "narration",
      "grossAmount",
      "GstAmount",
      "netAmount",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    try {
      const newInvoice = new salesInvoiceModel({
        userId,
        date,
        InvoiceNo,
        salesType,
        customerType,
        customerName,
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
        cash,
        bank,
        otherChargesDescription,
        othercharges,
        narration,
        grossAmount,
        GstAmount,
        netAmount,
      });
      const savedInvoice = await newInvoice.save();
      res.status(201).send({
        message: "Invoice created successfully",
        invoice: savedInvoice,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const getAllSalesInvoiceCOntroller = async (req, res) => {
  try {
    const response = await salesInvoiceModel.find();

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res
      .status(200)
      .send({ success: true, message: "Data  found", response });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
export const getAllSalesInvoiceByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await salesInvoiceModel.find(id);
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
export const deletSalesInvoiceByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await salesInvoiceModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Sales Invoice Deleted Successfully",
      deleteData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
export const updateSalesInvoiceByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const invoice = await salesInvoiceModel.findById(_id);
    if (!invoice) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    // Update fields
    invoice.userId = updateData.userId || invoice.userId;
    invoice.date = updateData.date || invoice.date;
    invoice.InvoiceNo = updateData.InvoiceNo || invoice.InvoiceNo;
    invoice.salesType = updateData.salesType || invoice.salesType;
    invoice.customerType = updateData.customerType || invoice.customerType;
    invoice.customerName = updateData.customerName || invoice.customerName;
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
    invoice.cash = updateData.cash || invoice.cash;
    invoice.bank = updateData.bank || invoice.bank;
    invoice.otherChargesDescription =
      updateData.otherChargesDescription || invoice.otherChargesDescription;
    invoice.othercharges = updateData.othercharges || invoice.othercharges;
    invoice.narration = updateData.narration || invoice.narration;
    invoice.grossAmount = updateData.grossAmount || invoice.grossAmount;
    invoice.GstAmount = updateData.GstAmount || invoice.GstAmount;
    invoice.netAmount = updateData.netAmount || invoice.netAmount;

    const updatedInvoice = await invoice.save();

    return res.status(200).send({
      success: true,
      message: "Sales Invoice updated successfully",
      updatedInvoice,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
