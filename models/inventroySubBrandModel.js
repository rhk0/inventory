import mongoose from "mongoose";

const SubBrandNameSchema = new mongoose.Schema(
  {
    BrandName: {
      type: String,
    },
    SubBrandName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubBrand", SubBrandNameSchema);
