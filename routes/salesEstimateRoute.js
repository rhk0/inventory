import express from "express";
import formidable from "express-formidable";

import { createSalesEstimateController, deleteSalesEstimateController, getSalesEstimateByIdController, getSalesEstimatesController, updateSalesEstimateController } from "../controllers/SalesEstimateController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createSalesEstimatet",requireSignIn,isAdmin,  createSalesEstimateController);
router.get("/getAllSalesEstimatet",requireSignIn,isAdmin,  getSalesEstimatesController);
router.get("/getAllSalesEstimatetByID/:_id",requireSignIn,isAdmin,  getSalesEstimateByIdController);
router.delete("/deleteSalesEstimatetByID/:_id",requireSignIn,isAdmin,  deleteSalesEstimateController);
router.put("/updateSalesEstimatetByID/:_id",requireSignIn,isAdmin,  updateSalesEstimateController);

export default router;