import express from "express"
import { createManufacturerController, deletemanufacturerController, managemanufacturerController, manageSinglemanufacturerController, updatemanufacturerController } from "../controllers/manufacturerController.js";

const router = express.Router();

router.post("/createManufacturer",createManufacturerController);
router.get("/manageManufacturer",managemanufacturerController)
router.get("/manageSingleManufacturer/:_id",manageSinglemanufacturerController)
router.delete("/deleteManufacturer/:_id", deletemanufacturerController);
router.put("/updateManufacturer/:_id", updatemanufacturerController);
export default router;
