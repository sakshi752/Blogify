import express from "express"

const router = express.Router();

router.post("/")
router.patch("/:id")
router.delete("/")
router.get("/")
router.get("/:id")

export default router