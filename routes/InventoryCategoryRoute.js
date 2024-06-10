import express from "express"
import { createInventoryCategoryController, deleteInventoryCategoryController, manageInventoryCategoryController, updateInventoryCategoryController } from "../controllers/InventoryCategogryController.js";

const router = express.Router();
router.post("/createcategory",createInventoryCategoryController)
router.get("/getcategory",manageInventoryCategoryController)
router.delete("/deletecategory/:_id",deleteInventoryCategoryController)
router.put("/updtaecategory/:_id",updateInventoryCategoryController)
export default router;
