import express from "express";
import {
  createReturnController,
  deletReturnByIDController,
  getAllReturnByIdController,
  getAllReturnCOntroller,
  updateReturnByIDController,
} from "../controllers/salesReturnController.js";

const router = express.Router();

router.post("/createsalesreturn", createReturnController);
router.get("/getAllreturn", getAllReturnCOntroller);
router.get("/getAllreturnById/:_id", getAllReturnByIdController);
router.put("/updatereturn/:_id", updateReturnByIDController);
router.delete("/deletereturn/:_id", deletReturnByIDController);

export default router;
