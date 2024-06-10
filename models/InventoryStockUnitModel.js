import mongoose from "mongoose";

const StockUnitSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    saymbol: {
      type: String,
    },
    formalName: {
        type: String,
      }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockUnit", StockUnitSchema);