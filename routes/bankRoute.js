import express from "express"
import { createBankController, deleteBankController, manageBankController, manageSingleBankController, updateBankController } from "../controllers/bankController.js";

const router = express.Router();

router.post("/createBank",createBankController);
router.get("/manageBank",manageBankController)
router.get("/manageSingleBank/:_id",manageSingleBankController)
router.delete("/deleteBank/:_id", deleteBankController);
router.put("/updateBank/:_id", updateBankController);
export default router;