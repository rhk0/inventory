import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  manageProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/createproduct",formidable(),  createProductController);
router.get("/manageproduct", manageProductController);
router.delete("/deleteproduct/:_id", deleteProductController);
router.put("/updateproduct/:_id", updateProductController);

export default router;
