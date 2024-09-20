import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  manageProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createproduct",requireSignIn,isAdmin,  createProductController);
router.get("/manageproduct",requireSignIn,isAdmin, manageProductController);
router.delete("/deleteproduct/:_id",requireSignIn,isAdmin, deleteProductController);
router.put("/updateproduct/:id",requireSignIn,isAdmin, updateProductController);

export default router;
