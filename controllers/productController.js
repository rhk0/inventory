import ProductModel from "../models/productModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit per file
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).array("img", 10); // 'img' corresponds to the field name in your form data, 10 is the max count

export const createProductController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res
          .status(400)
          .send({ error: "Multer error", message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res
          .status(500)
          .send({ error: "Server error", message: err.message });
      }

      // Files uploaded successfully, proceed to create product
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
        items,
      } = req.body;

      let parsedItems;
      try {
        parsedItems = JSON.parse(items);
      } catch (e) {
        return res.status(400).send({
          message: "Invalid JSON format for items field",
          details: e.message,
        });
      }

      const rows = parsedItems.map((rowData) => ({
        variant: rowData.variant,
        productCode: rowData.productCode,
        productName: rowData.productName,
        purchasePrice: rowData.purchasePrice,
        landingCost: rowData.landingCost,
        mrp: rowData.mrp,
        retailDiscount: rowData.retailDiscount,
        retailPrice: rowData.retailPrice,
        retailMargin: rowData.retailMargin,
        wholesalerDiscount: rowData.wholesalerDiscount,
        wholesalerPrice: rowData.wholesalerPrice,
        wholesaleMargin: rowData.wholesaleMargin,
        minimumStock: rowData.minimumStock,
        maximumStock: rowData.maximumStock,
        openingQty: rowData.openingQty,
      }));

      const requiredFields = [
        "itemCode",
        "productName",
        "category",
        "subCategory",
        "brand",
        "subBrand",
        "uom",
        "gstRate",
        "purchaseTaxInclude",
        "salesTaxInclude",
        "cess",
        "batchNo",
        "expiryDate",
        "manufacture",
        "ingredients",
        "feature",
        "description",
        "newWeight",
        "purchasePrice",
        "landingCost",
        "mrp",
        "retailDiscount",
        "retailPrice",
        "retailMargin",
        "wholesalerDiscount",
        "wholesalerPrice",
        "wholesaleMargin",
        "minimumStock",
        "maximumStock",
        "particular",
        "quantity",
        "rate",
        "units",
        "amount",
      ];

      const missingFields = requiredFields.filter(
        (field) => !req.body[field]
      );
      if (missingFields.length > 0) {
        return res.status(400).send({
          message: "Required fields are missing",
          missingFields: missingFields,
        });
      }

      const img = req.files ? req.files.map(file => file.path) : [];

      if (!img.length) {
        return res.status(400).send({ error: "Images are required." });
      }

      try {
        const newProduct = new ProductModel({
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
          img,
          rows,
        });
        const savedProduct = await newProduct.save();
        res.status(201).send({
          message: "Product added successfully",
          product: savedProduct,
        });
      } catch (error) {
        res.status(500).send({ error: "Server error", message: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
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
        .send({ success: false, message: "Product not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
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
      items,
    } = req.fields;

    const { productId } = req.params;

    // Parse 'items' if it's a stringified JSON array
    let parsedItems;
    try {
      parsedItems = JSON.parse(items);
    } catch (e) {
      return res.status(400).send({
        message: "Invalid JSON format for items field",
        details: e.message,
      });
    }

    const rows = parsedItems.map((rowData) => ({
      variant: rowData.variant,
      productCode: rowData.productCode,
      productName: rowData.productName,
      purchasePrice: rowData.purchasePrice,
      landingCost: rowData.landingCost,
      mrp: rowData.mrp,
      retailDiscount: rowData.retailDiscount,
      retailPrice: rowData.retailPrice,
      retailMargin: rowData.retailMargin,
      wholesalerDiscount: rowData.wholesalerDiscount,
      wholesalerPrice: rowData.wholesalerPrice,
      wholesaleMargin: rowData.wholesaleMargin,
      minimumStock: rowData.minimumStock,
      maximumStock: rowData.maximumStock,
      openingQty: rowData.openingQty,
    }));

    const photoFiles = Object.values(req.files);

    const requiredFields = [
      "itemCode",
      "productName",
      "category",
      "subCategory",
      "brand",
      "subBrand",
      "uom",
      "gstRate",
      "purchaseTaxInclude",
      "salesTaxInclude",
      "cess",
      "batchNo",
      "expiryDate",
      "manufacture",
      "ingredients",
      "feature",
      "description",
      "newWeight",
      "purchasePrice",
      "landingCost",
      "mrp",
      "retailDiscount",
      "retailPrice",
      "retailMargin",
      "wholesalerDiscount",
      "wholesalerPrice",
      "wholesaleMargin",
      "minimumStock",
      "maximumStock",
      "particular",
      "quantity",
      "rate",
      "units",
      "amount",
    ];

    const missingFields = requiredFields.filter((field) => !req.fields[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    product.itemCode = itemCode;
    product.productName = productName;
    product.category = category;
    product.subCategory = subCategory;
    product.brand = brand;
    product.subBrand = subBrand;
    product.uom = uom;
    product.gstRate = gstRate;
    product.purchaseTaxInclude = purchaseTaxInclude;
    product.salesTaxInclude = salesTaxInclude;
    product.cess = cess;
    product.batchNo = batchNo;
    product.expiryDate = expiryDate;
    product.manufacture = manufacture;
    product.ingredients = ingredients;
    product.feature = feature;
    product.description = description;
    product.newWeight = newWeight;
    product.purchasePrice = purchasePrice;
    product.landingCost = landingCost;
    product.mrp = mrp;
    product.retailDiscount = retailDiscount;
    product.retailPrice = retailPrice;
    product.retailMargin = retailMargin;
    product.wholesalerDiscount = wholesalerDiscount;
    product.wholesalerPrice = wholesalerPrice;
    product.wholesaleMargin = wholesaleMargin;
    product.minimumStock = minimumStock;
    product.maximumStock = maximumStock;
    product.particular = particular;
    product.quantity = quantity;
    product.rate = rate;
    product.units = units;
    product.amount = amount;
    product.rows = rows;

    // Handle photo files if any
    if (photoFiles.length > 0) {
      product.photo = [];
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
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error in updating product",
      details: error.message,
    });
  }
};

