import mongoose from "mongoose";

const StockUnitSchema = new mongoose.Schema(
  {
    unitofquantity:{
      type: String,
    },
    symbol: {
      type: String,
    },
    formalName: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StockUnit", StockUnitSchema);
