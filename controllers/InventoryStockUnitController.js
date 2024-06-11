import InventoryStockUnitModel from "../models/InventoryStockUnitModel.js";

export const createInventoryStockUnitController = async (req, res) => {
  try {
    const { type, saymbol, formalName } = req.body;

    const requiredFields = ["type", "saymbol", "formalName"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const response = await InventoryStockUnitModel.create({
      type,
      saymbol,
      formalName,
    });

    if (response) {
      return res.status(201).send({
        success: true,
        message: "Stock Unit Created Successfully",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
export const manageInventoryStockUnitController = async (req, res) => {
  try {
    const data = await InventoryStockUnitModel.find();
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const deleteInventoryStockUnitController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await InventoryStockUnitModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Stock Unit not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Stock Unit deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const updateInventoryStockUnitController = async (req, res) => {
  try {
    const { _id } = req.params;

    const { type, saymbol, formalName } = req.body;

    const requiredFields = ["type", "saymbol", "formalName"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }

    const StockUnit = await InventoryStockUnitModel.findByIdAndUpdate(
      _id,
      { type, saymbol, formalName },
      {
        new: true,
      }
    );

    if (!StockUnit) {
      return res.status(404).send({
        success: false,
        message: "StockUnit not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Stock Unit updated successfully",
      data: StockUnit,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
