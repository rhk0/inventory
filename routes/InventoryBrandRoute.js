import express from "express"
import { createInventoryBrandController, deleteInventoryBrandController, manageInventoryBrandController, updateInventoryBrandController } from "../controllers/InventoryBrandController.js";

const router = express.Router();
router.post("/createBrand",createInventoryBrandController)
router.get("/getBrand",manageInventoryBrandController)
router.delete("/deleteBrand/:_id",deleteInventoryBrandController)
router.put("/updtaeBrand/:_id",updateInventoryBrandController)
export default router;
