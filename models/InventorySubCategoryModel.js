import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
    },
    subCategoryName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubCategoryName", SubCategorySchema);
