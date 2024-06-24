import express from "express";
import {

  createDeliveryChallanController,
  deletDeliveryChallanByIDController,
  getAllDeliveryChallanCOntroller,
  updateDeliveryChallanByIDController,
} from "../controllers/deliveryChallanController.js";

const router = express.Router();

router.post("/createDeliveryChallan", createDeliveryChallanController);
router.get("/getAllDeliveryChallan", getAllDeliveryChallanCOntroller);
router.put("/updateDeliveryChallan/:_id", updateDeliveryChallanByIDController);
router.delete(
  "/deleteDeliveryChallan/:_id",
  deletDeliveryChallanByIDController
);

export default router;
