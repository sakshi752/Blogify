import express from "express"
import { authenticationMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authenticationMiddleware)
router.patch("/:id")
router.delete("/")
router.get("/")
router.get("/:id")

export default router