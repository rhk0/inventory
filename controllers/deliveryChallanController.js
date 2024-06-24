import deliveryChallanModel from "../models/deliveryChallanModel.js";

export const createDeliveryChallanController = async (req, res) => {
  try {
    const {
      date,
      challanNo,
      selectCustomer,
      reverseCharge,
      placeOfSupply,
      paymentsTerms,
      dueDate,
      taxType,
      billingAddress,
      shippingAddress,
      customerType,
      Items,
    
    } = req.body;

    const requiredFields = [
      "date",
      "challanNo",
      "selectCustomer",
      "reverseCharge",
      "placeOfSupply",
      "paymentsTerms",
      "dueDate",
      "taxType",
      "billingAddress",
      "shippingAddress",
      "customerType",
      "Items",

    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const rows = Items.map((rowData) => ({
      itemName: rowData.itemName,
      itemCode: rowData.itemCode,
      hsnCode: rowData.hsnCode,
      qty: rowData.qty,
      rate: rowData.rate,
      cgst: rowData.cgst,
      sgst: rowData.sgst,
      igst: rowData.igst,
      total: rowData.total,
    }));

    try {
      const newProduct = new deliveryChallanModel({
        date,
        challanNo,
        selectCustomer,
        reverseCharge,
        placeOfSupply,
        paymentsTerms,
        dueDate,
        taxType,
        billingAddress,
        shippingAddress,
        customerType,
        rows,
 
      });
      const savedProduct = await newProduct.save();
      res.status(201).send({
        message: "Delivery Challan Creates successfully",
        product: savedProduct,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const getAllDeliveryChallanCOntroller = async (req, res) => {
  try {
    const response = await deliveryChallanModel.find();

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

export const deletDeliveryChallanByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await deliveryChallanModel.findByIdAndDelete({ _id });

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

export const updateDeliveryChallanByIDController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const invoice = await deliveryChallanModel.findById(_id);
    if (!invoice) {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }

    // Update fields
    invoice.date = updateData.date || invoice.date;
    invoice.invoiceNo = updateData.invoiceNo || invoice.invoiceNo;
    invoice.selectCustomer = updateData.selectCustomer || invoice.selectCustomer;
    invoice.reverseCharge = updateData.reverseCharge || invoice.reverseCharge;
    invoice.placeOfSupply = updateData.placeOfSupply || invoice.placeOfSupply;
    invoice.paymentsTerms = updateData.paymentsTerms || invoice.paymentsTerms;
    invoice.dueDate = updateData.dueDate || invoice.dueDate;
    invoice.taxType = updateData.taxType || invoice.taxType;
    invoice.billingAddress = updateData.billingAddress || invoice.billingAddress;
    invoice.shippingAddress = updateData.shippingAddress || invoice.shippingAddress;
    invoice.customerType = updateData.customerType || invoice.customerType;

    // Update rows array
    if (updateData.Items) {
      invoice.rows = updateData.Items.map((rowData) => ({
        itemName: rowData.itemName,
        itemCode: rowData.itemCode,
        hsnCode: rowData.hsnCode,
        qty: rowData.qty,
        rate: rowData.rate,
        cgst: rowData.cgst,
        sgst: rowData.sgst,
        igst: rowData.igst,
        total: rowData.total,
      }));
    }

    const updatedInvoice = await invoice.save();

    return res.status(200).send({
      success: true,
      message: "Delivery Challan updated successfully",
      updatedInvoice,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Issue" });
  }
};
