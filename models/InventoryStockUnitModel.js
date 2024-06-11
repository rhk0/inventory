import mongoose from "mongoose";

const StockUnitSchema = new mongoose.Schema(
  {
    compoundedType:{
      type: String,
    },
    symbol: {
      type: String,
    },
    formalName: {
      type: String,
    },
    primaryUnit: {
      type: String,
    },
    conversionOf: {
      type: String,
    },
    secondaryUnit: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockUnit", StockUnitSchema);
