import salesEstimateModel from "../models/salesEstimateModel.js"; // Adjust the import path as necessary

export const createSalesEstimateController = async (req, res) => {
  try {
    // Extract the sales estimate data from the request body
    const {
      date,
      estimateNo,
      salesType,
      customerType,
      customerName,
      placeOfSupply,
      paymentTerm,
      dueDate,
      receiptDocNo,
      dispatchedThrough,
      destination,
      carrierNameAgent,
      billOfLading,
      motorVehicleNo,
      billingAddress,
      reverseCharge,
      gstType,
      rows,
      otherChargesDiscount,
      othercharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    } = req.body;

    // Validate required fields (basic validation example)
    const requiredFields = [
      date,
      estimateNo,
      customerName,
      billingAddress,
      rows,
    ];
    
    if (requiredFields.some(field => !field)) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Create a new instance of the SalesEstimate model
    const newSalesEstimate = new salesEstimateModel({
      date,
      estimateNo,
      salesType,
      customerType,
      customerName,
      placeOfSupply,
      paymentTerm,
      dueDate,
      receiptDocNo,
      dispatchedThrough,
      destination,
      carrierNameAgent,
      billOfLading,
      motorVehicleNo,
      billingAddress,
      reverseCharge,
      gstType,
      rows,
      otherChargesDiscount,
      othercharges,
      narration,
      grossAmount,
      GstAmount,
      netAmount,
    });

    // Save the new sales estimate to the database
    const savedEstimate = await newSalesEstimate.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Sales estimate created successfully",
      salesEstimate: savedEstimate,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getSalesEstimatesController = async (req, res) => {
  try {
    const salesEstimates = await salesEstimateModel.find();
    res.status(200).json({
      success: true,
      salesEstimates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getSalesEstimateByIdController = async (req, res) => {
  try {
    const { _id } = req.params;
    const salesEstimate = await salesEstimateModel.findById(_id);

    if (!salesEstimate) {
      return res.status(404).json({
        success: false,
        message: "Sales estimate not found",
      });
    }

    res.status(200).json({
      success: true,
      salesEstimate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const updateSalesEstimateController = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedData = req.body;

    const salesEstimate = await salesEstimateModel.findByIdAndUpdate(
      _id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!salesEstimate) {
      return res.status(404).json({
        success: false,
        message: "Sales estimate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales estimate updated successfully",
      salesEstimate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteSalesEstimateController = async (req, res) => {
  try {
    const { _id } = req.params;
    const salesEstimate = await salesEstimateModel.findByIdAndDelete(_id);

    if (!salesEstimate) {
      return res.status(404).json({
        success: false,
        message: "Sales estimate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales estimate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
