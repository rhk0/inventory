import express from "express"
import { CashDepositeIntoBankController, CashWithdrawfromBankController, bankToBankTransferController, getBankToBankTransferById, getCashDepositIntoBankById, getCashWithdrawFromBankById } from "../controllers/bankTransactionController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();
 
router.post("/banktoBankTransfer",requireSignIn,isAdmin,bankToBankTransferController)
router.post("/CashDepositeIntoBank",requireSignIn,isAdmin,CashDepositeIntoBankController)
router.post("/CashWithdrawfromBank",requireSignIn,isAdmin,CashWithdrawfromBankController)

router.get("/getbanktoBankTransfer/:_id",requireSignIn,isAdmin,getBankToBankTransferById)
router.get("/getCashDepositeIntoBank/:_id",requireSignIn,isAdmin,getCashDepositIntoBankById)
router.get("/getCashWithdrawfromBank/:_id",requireSignIn,isAdmin,getCashWithdrawFromBankById)

export  default router;