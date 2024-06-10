import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    BrandName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", BrandSchema);
