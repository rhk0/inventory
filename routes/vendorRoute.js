import express from "express"
import { createvendorController, deletevendorController, manageSinglevendorController, managevendorController, updatevendorController } from "../controllers/vendorController.js";

const router = express.Router();

router.post("/createVendor",createvendorController);
router.get("/manageVendor",managevendorController)
router.get("/manageSingleVendor/:_id",manageSinglevendorController)
router.delete("/deleteVendor/:_id", deletevendorController);
router.put("/updateVendor/:_id", updatevendorController);
export default router;
