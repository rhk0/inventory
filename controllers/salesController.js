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
      Items
    } = req.body;  
   
 
  //  const requiredFields = [
  //     "date",
  //     "quotationNo",
  //     "selectCustomer",
  //     "reverseCharge",
  //     "placeOfSupply",
  //     "paymentsTerms",
  //     "dueDate",
  //     "taxType",
  //     "billingAddress",
  //     "shippingAddress",
  //     "Items"
  //   ];
  //   const missingFields = requiredFields.filter((field) => !req.body[field]);
  //   if (missingFields.length > 0) {
  //     return res.status(400).send({
  //       message: "Required fields are missing",
  //       missingFields: missingFields,
  //     });
  //   }
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
