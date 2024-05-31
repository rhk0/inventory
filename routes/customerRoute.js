import express from "express"
import { createCustomerController, deleteCustomerController, manageCustomerController, manageSingleCustomerController, updateCustomerController } from "../controllers/customerController.js";

const router = express.Router();

router.post("/createCustomer",createCustomerController);
router.get("/manageCustomer",manageCustomerController)
router.get("/manageSingleCustomer/:_id",manageSingleCustomerController)
router.delete("/deleteCustomer/:_id", deleteCustomerController);
router.put("/updateCustomer/:_id", updateCustomerController);
export default router;
