import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  itemCode: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  subBrand: { type: String, required: true },
  uom: { type: String, required: true },
  gstRate: { type: String, required: true },
  purchaseTaxInclude: { type: String, required: true },
  salesTaxInclude: { type: String, required: true },
  cess: { type: String, required: true },
  batchNo: { type: String, required: true },
  expiryDate: { type: String, required: true },
  manufacture: { type: String, required: true },
  ingredients: { type: String, required: true },
  feature: { type: String, required: true },
  description: { type: String, required: true },
  newWeight: { type: String, required: true },
  purchasePrice: { type: String, required: true },
  landingCost: { type: String, required: true },
  mrp: { type: String, required: true },
  retailDiscount: { type: String, required: true },
  retailPrice: { type: String, required: true },
  retailMargin: { type: String, required: true },
  wholesalerDiscount: { type: String, required: true },
  wholesalerPrice: { type: String, required: true },
  wholesaleMargin: { type: String, required: true },
  minimumStock: { type: String, required: true },
  maximumStock: { type: String, required: true },
  particular: { type: String, required: true },
  quantity: { type: String, required: true },
  rate: { type: String, required: true },
  units: { type: String, required: true },
  amount: { type: String, required: true },  
  img: [{
    type: String,
    required: true
}],
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

export default mongoose.model("product", productSchema);












//  previos version

//  import mongoose from "mongoose";

// const QuatationRowSchema =  mongoose.Schema({
//   variant: { type: String },
//   productCode: { type: String },
//   productName: { type: String },
//   purchasePrice: { type: Number },
//   landingCost: { type: Number },
//   mrp: { type: Number },
//   retailDiscount: { type: Number },
//   retailPrice: { type: Number },
//   // retailMargin: { type: Number },
//   wholesalerDiscount: { type: Number },
//   wholesalerPrice: { type: Number },
//   wholesaleMargin: { type: Number },
//   minimumStock: { type: Number },
//   maximumStock: { type: Number },
// openingQty: { type: Number },
// });

// const productSchema = new mongoose.Schema(
//   {
//     // Product Information
//     itemCode: {
//       type: String,
//     },
//     productName: {
//       type: String,
//     },
//     category: {
//       type: String,
//     },
//     subCategory: {
//       type: String,
//     },
//     brand: {
//       type: String,
//     },
//     subBrand: {
//       type: String,
//     },
//     uom: {
//       type: String,
//     },
//     gstRate: {
//       type: String,
//     },
//     purchaseTaxInclude: {
//       type: String,
//     },
//     salesTaxInclude: {
//       type: String,
//     },
//     cess: {
//       type: String,
//     },
//     batchNo: {
//       type: String,
//     },
//     expiryDate: {
//       type: String,
//     },
//     manufacture: {
//       type: String,
//     },

//     ingredients: {
//       type: String,
//     },
//     feature: {
//       type: String,
//     },

//     description: {
//       type: String,
//     },
//     newWeight: {
//       type: String,
//     },

//     // photo 4 photo upload
//     photo: [
//       {
//         data: Buffer,
//         contentType: String,
//       },
//     ],
//     // Price Details
//     purchasePrice: {
//       type: String,
//     },
//     landingCost: {
//       type: String,
//     },
//     mrp: {
//       type: String,
//     },
//     retailDiscount: {
//       type: String,
//     },
//     retailPrice: {
//       type: String,
//     },
//     retailMargin: {
//       type: String,
//     },
//     wholesalerDiscount: {
//       type: String,
//     },
//     wholesalerPrice: {
//       type: String,
//     },
//     wholesaleMargin: {
//       type: String,
//     },
//     minimumStock: {
//       type: String,
//     },
//     maximumStock: {
//       type: String,
//     },

//     // Opening Balance

//     particular: {
//       type: String,
//     },
//     quantity: {
//       type: String,
//     },
//     rate: {
//       type: String,
//     },
//     units: {
//       type: String,
//     },
//     amount: {
//       type: String,
//     },
//     rows: [QuatationRowSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("product", productSchema);
