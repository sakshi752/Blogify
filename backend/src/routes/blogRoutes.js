import express from "express"
import { authenticationMiddleware } from "../middleware/authMiddleware.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogsController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Public routes
router.get("/",getAllBlogs)
router.get("/:id",getBlogById)

// Secured routes 
router.post("/",authenticationMiddleware,upload.single('coverImage'),createBlog)
router.patch("/:id",authenticationMiddleware,updateBlog)
router.delete("/",authenticationMiddleware,deleteBlog)
router.get("/:id",authenticationMiddleware,getBlogById)

export default router