import express from "express"
import { createInventorySubBrandController, deleteInventorySubBrandController, manageInventorySubBrandController, updateInventorySubBrandController } from "../controllers/InventroySubBrandontroller.js";

const router = express.Router();
router.post("/createSubBrand",createInventorySubBrandController)
router.get("/getSubBrand",manageInventorySubBrandController)
router.delete("/deleteSubBrand/:_id",deleteInventorySubBrandController)
router.put("/updtaeSubBrand/:_id",updateInventorySubBrandController)
export default router;