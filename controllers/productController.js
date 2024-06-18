import productModel from "../models/productModel.js";
import fs from "fs";
import formidable  from "formidable";
import { BsColumnsGap } from "react-icons/bs";

export const createProductController = async (req, res) => {
  try {
    const {
      itemCode,
      productName,
      category,
      subCategory,
      brand,
      subBrand,
      uom,
      gstRate,
      purchaseTaxInclude,
      salesTaxInclude,
      cess,
      batchNo,
      expiryDate,
      manufacture,
      ingredients,
      feature,
      description,
      newWeight,
      purchasePrice,
      landingCost,
      mrp,
      retailDiscount,
      retailPrice,
      retailMargin,
      wholesalerDiscount,
      wholesalerPrice,
      wholesaleMargin,
      minimumStock,
      maximumStock,
      particular,
      quantity,
      rate,
      units,
      amount,
      // items,
    } = req.fields;

   

    // Parse 'items' if it's a stringified JSON array
    // let parsedItems;
    // try {
    //   parsedItems = JSON.parse(items);
    // } catch (e) {
    //   return res.status(400).send({
    //     message: "Invalid JSON format for items field",
    //     details: e.message,
    //   });
    // }

    // const rows = parsedItems.map((rowData) => ({
    //   variant: rowData.variant,
    //   productCode: rowData.productCode,
    //   productName: rowData.productName,
    //   purchasePrice: rowData.purchasePrice,
    //   landingCost: rowData.landingCost,
    //   mrp: rowData.mrp,
    //   retailDiscount: rowData.retailDiscount,
    //   retailPrice: rowData.retailPrice,
    //   retailMargin: rowData.retailMargin,
    //   wholesalerDiscount: rowData.wholesalerDiscount,
    //   wholesalerPrice: rowData.wholesalerPrice,
    //   wholesaleMargin: rowData.wholesaleMargin,
    //   minimumStock: rowData.minimumStock,
    //   maximumStock: rowData.maximumStock,
    //   openingQty: rowData.openingQty,
    // }));
    const photoFiles = Object.values(req.files);
    // const requiredFields = [
    //   "itemCode",
    //   "productName",
    //   "category",
    //   "subCategory",
    //   "brand",
    //   "subBrand",
    //   "uom",
    //   "gstRate",
    //   "purchaseTaxInclude",
    //   "salesTaxInclude",
    //   "cess",
    //   "batchNo",
    //   "expiryDate",
    //   "manufacture",
    //   "ingredients",
    //   "feature",
    //   "description",
    //   "newWeight",
    //   "purchasePrice",
    //   "landingCost",
    //   "mrp",
    //   "retailDiscount",
    //   "retailPrice",
    //   "retailMargin",
    //   "wholesalerDiscount",
    //   "wholesalerPrice",
    //   "wholesaleMargin",
    //   "minimumStock",
    //   "maximumStock",
    //   "particular",
    //   "quantity",
    //   "rate",
    //   "units",
    //   "amount",
    // ];

    // const missingFields = requiredFields.filter((field) => !req.fields[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).send({
    //     message: "Required fields are missing",
    //     missingFields: missingFields,
    //   });
    // }

    const product = new productModel({
      itemCode,
      productName,
      category,
      subCategory,
      brand,
      subBrand,
      uom,
      gstRate,
      purchaseTaxInclude,
      salesTaxInclude,
      cess,
      batchNo,
      expiryDate,
      manufacture,
      ingredients,
      feature,
      description,
      newWeight,
      purchasePrice,
      landingCost,
      mrp,
      retailDiscount,
      retailPrice,
      retailMargin,
      wholesalerDiscount,
      wholesalerPrice,
      wholesaleMargin,
      minimumStock,
      maximumStock,
      particular,
      quantity,
      rate,
      units,
      amount,
      photo: [],
      // rows,
    });

    let photoCount = 0;
    for (const p of photoFiles) {
      if (photoCount >= 10) {
        return res.status(400).send({ message: "Maximum 10 photos allowed" });
      }

      if (p.size > 1000000) {
        return res
          .status(400)
          .send({ message: "Photo should be less than 1MB" });
      }

      const imageBuffer = fs.readFileSync(p.path);
      product.photo.push({ data: imageBuffer, contentType: p.type });
      photoCount++;
    }

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error in creating product",
      details: error.message,
    });
  }
};

export const manageProductController = async (req, res) => {
  try {
    const data = await productModel.find();
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await productModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "SubBrand not found" });
    }

    return res.status(200).send({
      success: true,
      message: "SubBrand deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { BrandName, SubBrandName } = req.body;

    const requiredFields = ["BrandName", "SubBrandName"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const SubBrand = await productModel.findByIdAndUpdate(
      _id,
      { BrandName, SubBrandName },
      {
        new: true,
      }
    );

    if (!SubBrand) {
      return res.status(404).send({
        success: false,
        message: "SubBrand not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "SubBrand updated successfully",
      data: SubBrand,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};




//   try {
//     const form = new formidable.IncomingForm();
//     form.multiples = true; // Allow multiple files

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(400).send({ message: 'Error parsing the form', err });
//       }

//       const {
//         itemCode,
//         productName,
//         category,
//         subCategory,
//         brand,
//         subBrand,
//         uom,
//         gstRate,
//         purchaseTaxInclude,
//         salesTaxInclude,
//         cess,
//         batchNo,
//         expiryDate,
//         manufacture,
//         ingredients,
//         feature,
//         description,
//         newWeight,
//         purchasePrice,
//         landingCost,
//         mrp,
//         retailDiscount,
//         retailPrice,
//         retailMargin,
//         wholesalerDiscount,
//         wholesalerPrice,
//         wholesaleMargin,
//         minimumStock,
//         maximumStock,
//         particular,
//         quantity,
//         rate,
//         units,
//         amount,
//         items,
//       } = fields;

//       let parsedItems;
//       try {
//         parsedItems = JSON.parse(items);
//       } catch (parseError) {
//         return res.status(400).send({ message: 'Error parsing items field', parseError });
//       }

//       const rows = parsedItems.map((rowData) => ({
//         variant: rowData.variant,
//         productCode: rowData.productCode,
//         productName: rowData.productName,
//         purchasePrice: rowData.purchasePrice,
//         landingCost: rowData.landingCost,
//         mrp: rowData.mrp,
//         retailDiscount: rowData.retailDiscount,
//         retailPrice: rowData.retailPrice,
//         retailMargin: rowData.retailMargin,
//         wholesalerDiscount: rowData.wholesalerDiscount,
//         wholesalerPrice: rowData.wholesalerPrice,
//         wholesaleMargin: rowData.wholesaleMargin,
//         minimumStock: rowData.minimumStock,
//         maximumStock: rowData.maximumStock,
//         openingQty: rowData.openingQty,
//       }));

//       const photoFiles = files.photos ? (Array.isArray(files.photos) ? files.photos : [files.photos]) : [];
//       const requiredFields = [
//         "itemCode",
//         "productName",
//         "category",
//         "subCategory",
//         "brand",
//         "subBrand",
//         "uom",
//         "gstRate",
//         "purchaseTaxInclude",
//         "salesTaxInclude",
//         "cess",
//         "batchNo",
//         "expiryDate",
//         "manufacture",
//         "ingredients",
//         "feature",
//         "description",
//         "newWeight",
//         "purchasePrice",
//         "landingCost",
//         "mrp",
//         "retailDiscount",
//         "retailPrice",
//         "retailMargin",
//         "wholesalerDiscount",
//         "wholesalerPrice",
//         "wholesaleMargin",
//         "minimumStock",
//         "maximumStock",
//         "particular",
//         "quantity",
//         "rate",
//         "units",
//         "amount",
//       ];

//       const missingFields = requiredFields.filter((field) => !fields[field]);
//       if (missingFields.length > 0) {
//         return res.status(400).send({
//           message: "Required fields are missing",
//           missingFields: missingFields,
//         });
//       }

//       const product = new productModel({
//         itemCode,
//         productName,
//         category,
//         subCategory,
//         brand,
//         subBrand,
//         uom,
//         gstRate,
//         purchaseTaxInclude,
//         salesTaxInclude,
//         cess,
//         batchNo,
//         expiryDate,
//         manufacture,
//         ingredients,
//         feature,
//         description,
//         newWeight,
//         purchasePrice,
//         landingCost,
//         mrp,
//         retailDiscount,
//         retailPrice,
//         retailMargin,
//         wholesalerDiscount,
//         wholesalerPrice,
//         wholesaleMargin,
//         minimumStock,
//         maximumStock,
//         particular,
//         quantity,
//         rate,
//         units,
//         amount,
//         photo: [],
//         rows,
//       });

//       let photoCount = 0;
//       for (const p of photoFiles) {
//         if (photoCount >= 10) {
//           return res.status(400).send({ message: "Maximum 10 photos allowed" });
//         }

//         if (p.size > 1000000) {
//           return res
//             .status(400)
//             .send({ message: "Photo should be less than 1MB" });
//         }

//         const imageBuffer = fs.readFileSync(p.path);
//         product.photo.push({ data: imageBuffer, contentType: p.type });
//         photoCount++;
//       }

//       await product.save();

//       res.status(201).send({
//         success: true,
//         message: "Product Created Successfully",
//         product,
//       });
//     });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating product",
//     });
//   }
// };