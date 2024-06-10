import mongoose from "mongoose";

const CategoryNameSchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CategoryName", CategoryNameSchema);
