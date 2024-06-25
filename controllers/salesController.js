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
      totalAmount,
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
<<<<<<< HEAD
      itemCode:rowData.itemCode,
=======
      itemCode: rowData.itemCode,

>>>>>>> 46bf7deea8ed8e8691d8949e7b9c49314e0e3536
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
        totalAmount,
        
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

    const quotation = await salesQuotationModel.findById(_id);
    if (!quotation) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    // Update fields
    quotation.date = updateData.date || quotation.date;
    quotation.quotationNo = updateData.quotationNo || quotation.quotationNo;
    quotation.selectCustomer = updateData.selectCustomer || quotation.selectCustomer;
    quotation.reverseCharge = updateData.reverseCharge || quotation.reverseCharge;
    quotation.placeOfSupply = updateData.placeOfSupply || quotation.placeOfSupply;
    quotation.paymentsTerms = updateData.paymentsTerms || quotation.paymentsTerms;
    quotation.dueDtae = updateData.dueDtae || quotation.dueDtae;
    quotation.taxType = updateData.taxType || quotation.taxType;
    quotation.billingAddress = updateData.billingAddress || quotation.billingAddress;
    quotation.shippingAddress = updateData.shippingAddress || quotation.shippingAddress;
    quotation.taxAmount = updateData.taxAmount || quotation.taxAmount;
    quotation.totalAmount = updateData.totalAmount || quotation.totalAmount;

    // Update rows array
    if (updateData.Items) {
      quotation.rows = updateData.Items.map((rowData) => ({
        itemCode: rowData.itemCode,
        itemName: rowData.itemName,
        hsnCode: rowData.hsnCode,
        qty: rowData.qty,
        rate: rowData.rate,
        cgst: rowData.cgst,
        sgst: rowData.sgst,
        igst: rowData.igst,
        total: rowData.total,
      }));
    }

    const updatedQuotation = await quotation.save();

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


