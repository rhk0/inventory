import express from "express"

import { createInventoryStockUnitController, deleteInventoryStockUnitController, manageInventoryStockUnitController, updateInventoryStockUnitController } from "../controllers/InventoryStockUnitController.js";

const router = express.Router();
router.post("/createStockUnit",createInventoryStockUnitController)
router.get("/getStockUnit",manageInventoryStockUnitController)
router.delete("/deleteStockUnit/:_id",deleteInventoryStockUnitController)
router.put("/updtaeStockUnit/:_id",updateInventoryStockUnitController)
export default router;