import express from "express"
import { CashDepositeIntoBankController, bankToBankTransferController } from "../controllers/bankTransactionController.js";

const router = express.Router();
 
router.post("/banktoBankTransfer",bankToBankTransferController)
router.post("/CashDepositeIntoBank",bankToBankTransferController)
router.post("/CashWithdrawfromBank",CashDepositeIntoBankController)


export  default router;