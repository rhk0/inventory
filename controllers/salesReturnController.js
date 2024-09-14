import returnModel from "../models/returnModel.js";

export const createReturnController = async (req, res) => {
  try {
    const {
      userId,
      date,
      salesType,
      cresitNoteNo,
      customerName,
      placeOfSupply,
      paymentTerm,
      dueDate,
      dispatchedThrough,
      destination,
      carrierNameAgent,
      billOfLading,
      billingAddress,
      reverseCharge,
      gstType,
      reasonForReturn,
      rows,
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
      "SalesReturnNo",
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
      "cash",
      "bank",
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
      const newSalesReturn = new returnModel({
        userId,
        date,
        SalesReturnNo,
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
      const savedSalesReturn = await newSalesReturn.save();
      res.status(201).send({
        message: "SalesReturn created successfully",
        salesreturn: savedSalesReturn,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
export const getAllReturnCOntroller = async (req, res) => {
  try {
    const response = await returnModel.find();

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
export const getAllReturnByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await returnModel.find(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      salesreturn: response, // Named it `salesreturn` for clarity
    });
  } catch (error) {
    console.error("Error fetching sales salesreturn by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
export const deletReturnByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await returnModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Sales SalesReturn Deleted Successfully",
      deleteData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
export const updateReturnByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const salesreturn = await returnModel.findById(_id);
    if (!salesreturn) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    // Update fields
    salesreturn.userId = updateData.userId || salesreturn.userId;
    salesreturn.date = updateData.date || salesreturn.date;
    salesreturn.SalesReturnNo = updateData.SalesReturnNo || salesreturn.SalesReturnNo;
    salesreturn.salesType = updateData.salesType || salesreturn.salesType;
    salesreturn.customerType = updateData.customerType || salesreturn.customerType;
    salesreturn.customerName = updateData.customerName || salesreturn.customerName;
    salesreturn.placeOfSupply = updateData.placeOfSupply || salesreturn.placeOfSupply;
    salesreturn.paymentTerm = updateData.paymentTerm || salesreturn.paymentTerm;
    salesreturn.dueDate = updateData.dueDate || salesreturn.dueDate;
    salesreturn.receiptDocNo = updateData.receiptDocNo || salesreturn.receiptDocNo;
    salesreturn.dispatchedThrough =
      updateData.dispatchedThrough || salesreturn.dispatchedThrough;
    salesreturn.destination = updateData.destination || salesreturn.destination;
    salesreturn.carrierNameAgent =
      updateData.carrierNameAgent || salesreturn.carrierNameAgent;
    salesreturn.billOfLading = updateData.billOfLading || salesreturn.billOfLading;
    salesreturn.motorVehicleNo =
      updateData.motorVehicleNo || salesreturn.motorVehicleNo;
    salesreturn.billingAddress =
      updateData.billingAddress || salesreturn.billingAddress;
    salesreturn.reverseCharge = updateData.reverseCharge || salesreturn.reverseCharge;
    salesreturn.gstType = updateData.gstType || salesreturn.gstType;
    salesreturn.rows = updateData.rows || salesreturn.rows;
    salesreturn.cash = updateData.cash || salesreturn.cash;
    salesreturn.bank = updateData.bank || salesreturn.bank;
    salesreturn.otherChargesDescription =
      updateData.otherChargesDescription || salesreturn.otherChargesDescription;
    salesreturn.othercharges = updateData.othercharges || salesreturn.othercharges;
    salesreturn.narration = updateData.narration || salesreturn.narration;
    salesreturn.grossAmount = updateData.grossAmount || salesreturn.grossAmount;
    salesreturn.GstAmount = updateData.GstAmount || salesreturn.GstAmount;
    salesreturn.netAmount = updateData.netAmount || salesreturn.netAmount;

    const updatedSalesReturn = await salesreturn.save();

    return res.status(200).send({
      success: true,
      message: "Sales SalesReturn updated successfully",
      updatedSalesReturn,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
