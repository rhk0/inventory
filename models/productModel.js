import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // Other fields...
  rows: [
    {
      variant: String,
      productCode: String,
      productName: String,
      purchasePrice: Number,
      landingCost: Number,
      mrp: Number,
      retailDiscount: Number,
      retailPrice: Number,
      retailMargin: Number,
      wholesalerDiscount: Number,
      wholesalerPrice: Number,
      wholesaleMargin: Number,
      minimumStock: Number,
      maximumStock: Number,
      openingQty: Number,
    },
  ],
});

export default mongoose.model("Product", productSchema);
