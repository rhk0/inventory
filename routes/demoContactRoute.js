import  express from "express";
import {contactCreateController, contactListController} from "../controllers/demoContact/demoController.js"
const router = express.Router();
router.post("/create",contactCreateController)
router.get("/allList",contactListController)
export default router;
