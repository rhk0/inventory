import express from "express"

import { createInventorySubCategoryController, deleteInventorySubCategoryController, manageInventorySubCategoryController, updateInventorySubCategoryController } from "../controllers/InventorySubCategoryController.js";

const router = express.Router();
router.post("/createSubCategory",createInventorySubCategoryController)
router.get("/getSubCategory",manageInventorySubCategoryController)
router.delete("/deleteSubCategory/:_id",deleteInventorySubCategoryController)
router.put("/updtaeSubCategory/:_id",updateInventorySubCategoryController)
export default router;
