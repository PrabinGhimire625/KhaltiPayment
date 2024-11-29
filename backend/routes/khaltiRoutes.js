import {Router} from "express";
import { addKhalti, verifyTransaction } from "../controllers/khaltiController.js";
const router=Router();

router.route("/").post(addKhalti)
router.route("/verify").post(verifyTransaction)

export default router
