import {Router} from "express";
import { addKhalti } from "../controllers/khaltiController.js";
const router=Router();

router.route("/").post(addKhalti)

export default router
