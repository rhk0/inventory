import salesQuotationModel from "../models/salesQuotationModel.js";
export const createSalesController = async (req, res) => {
  try {
    const {
      date,
      quotationNo,
      selectCustomer,
      reverseCharge,
      placeOfSupply,
      paymentsTerms,
      dueDate,
      taxType,
      billingAddress,
      shippingAddress,
      Items,
      taxAmount,
      totalAmount
    } = req.body;

    // const requiredFields = [
    //   "date",
    //   "quotationNo",
    //   "selectCustomer",
    //   "reverseCharge",
    //   "placeOfSupply",
    //   "paymentsTerms",
    //   "dueDtae",
    //   "taxType",
    //   "billingAddress",
    //   "shippingAddress",
    //   "Items",
    // ];
    // const missingFields = requiredFields.filter((field) => !req.body[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).send({
    //     message: "Required fields are missing",
    //     missingFields: missingFields,
    //   });
    // }

    const rows = Items.map((rowData) => ({
      itemName: rowData.itemName,
      hsnCode: rowData.hsnCode,
      qty: rowData.qty,
      rate: rowData.rate,
      cgst: rowData.cgst,
      sgst: rowData.sgst,
      igst: rowData.igst,
      total: rowData.total,
    }));

    try {
      const newProduct = new salesQuotationModel({
        date,
        quotationNo,
        selectCustomer,
        reverseCharge,
        placeOfSupply,
        paymentsTerms,
        dueDate,
        taxType,
        billingAddress,
        shippingAddress,
        rows,
        taxAmount,
        totalAmount
      });
      const savedProduct = await newProduct.save();
      res.status(201).send({
        message: "Sales Quotation Creates successfully",
        product: savedProduct,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const getAllSalesQuotationCOntroller = async (req, res) => {
  try {
    const response = await salesQuotationModel.find();

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

export const deletSalesQuotationByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await salesQuotationModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Quotaion Deleted SUccessfully",
      deleteData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};

export const updateQuotationByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const updatedQuotation = await salesQuotationModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedQuotation) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Quotation updated successfully",
      updatedQuotation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
