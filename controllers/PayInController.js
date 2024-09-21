import payInModel from "../models/PayInModel.js";

export const createPayInController = async (req, res) => {
  try {
    const {
      date,
      receiptNo,
      selectCustomer,
      receiptMode,
      rows,
      total,
      Narration,
    } = req.body;
    const { _id } = req.user;
    const requiredFields = [
      "date",
      "receiptNo",
      "selectCustomer",
      "receiptMode",
      "rows",
      "total",
      "Narration",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: "Required fields are missing",
        missingFields: missingFields,
      });
    }
    // dyfyudguyfgfuyg
    // ghbufbnuihgvn
    try {
      const newPayIn = new payInModel({
        admin: _id,
        date,
        receiptNo,
        selectCustomer,
        receiptMode,
        rows,
        total,
        Narration,
      });
      const savedPayIn = await newPayIn.save();
      res.status(201).send({
        message: "Pay In created successfully",
        payIn: savedPayIn,
      });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const getAllPayInController = async (req, res) => {
  try {
    const response = await payInModel.find();

    if (!response || response.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data found",
      payInList: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const getPayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await payInModel.findById(_id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data found",
      payIn: response,
    });
  } catch (error) {
    console.error("Error fetching Pay In by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const deletePayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteData = await payInModel.findByIdAndDelete({ _id });

    if (!deleteData) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Pay In deleted successfully",
      deletedPayIn: deleteData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};

export const updatePayInByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const payIn = await payInModel.findById(_id);
    if (!payIn) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }

    // Update fields if provided in the request body

    payIn.date = updateData.date || payIn.date;
    payIn.receiptNo = updateData.receiptNo || payIn.receiptNo;
    payIn.selectCustomer = updateData.selectCustomer || payIn.selectCustomer;
    payIn.receiptMode = updateData.receiptMode || payIn.receiptMode;
    payIn.rows = updateData.rows || payIn.rows;
    payIn.total = updateData.total || payIn.total;
    payIn.Narration = updateData.Narration || payIn.Narration;

    try {
      const updatedPayIn = await payIn.save();
      return res.status(200).send({
        success: true,
        message: "Pay In updated successfully",
        payIn: updatedPayIn,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error updating Pay In",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error updating Pay In by ID:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Issue",
      error: error.message,
    });
  }
};
