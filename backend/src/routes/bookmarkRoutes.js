import express from "express"
import { authenticationMiddleware } from "../middleware/authMiddleware.js";
import { bookMarkBlog, removeBookMarkedBlog } from "../controllers/bookmarkController.js";

const router = express.Router()

router.post("/",authenticationMiddleware,bookMarkBlog);
router.delete("/:id",authenticationMiddleware,removeBookMarkedBlog);

export default router;