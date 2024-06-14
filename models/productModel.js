import mongoose from "mongoose";

const QuatationRowSchema =  mongoose.Schema({
  variant: { type: String },
  productCode: { type: String },
  productName: { type: String },
  purchasePrice: { type: Number },
  landingCost: { type: Number },
  mrp: { type: Number },
  retailDiscount: { type: Number },
  retailPrice: { type: Number },
  retailMargin: { type: Number },
  wholesalerDiscount: { type: Number },
  wholesalerPrice: { type: Number },
  wholesaleMargin: { type: Number },
  minimumStock: { type: Number },
  maximumStock: { type: Number },
openingQty: { type: Number },
});

const productSchema = new mongoose.Schema(
  {
    // Product Information
    itemCode: {
      type: String,
    },
    productName: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    subBrand: {
      type: String,
    },
    uom: {
      type: String,
    },
    gstRate: {
      type: String,
    },
    purchaseTaxInclude: {
      type: String,
    },
    salesTaxInclude: {
      type: String,
    },
    cess: {
      type: String,
    },
    batchNo: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    manufacture: {
      type: String,
    },

    ingredients: {
      type: String,
    },
    feature: {
      type: String,
    },

    description: {
      type: String,
    },
    newWeight: {
      type: String,
    },

    // photo 4 photo upload
    photo: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    // Price Details
    purchasePrice: {
      type: String,
    },
    landingCost: {
      type: String,
    },
    mrp: {
      type: String,
    },
    retailDiscount: {
      type: String,
    },
    retailPrice: {
      type: String,
    },
    retailMargin: {
      type: String,
    },
    wholesalerDiscount: {
      type: String,
    },
    wholesalerPrice: {
      type: String,
    },
    wholesaleMargin: {
      type: String,
    },
    minimumStock: {
      type: String,
    },
    maximumStock: {
      type: String,
    },

    // Opening Balance

    particular: {
      type: String,
    },
    quantity: {
      type: String,
    },
    rate: {
      type: String,
    },
    units: {
      type: String,
    },
    amount: {
      type: String,
    },
    rows: [QuatationRowSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);
