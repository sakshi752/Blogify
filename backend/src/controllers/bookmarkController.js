import Blog from "../modals/Blog.js";
import Bookmark from "../modals/Bookmark.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateRequiredFields } from "../utils/validators.js";

export const bookMarkBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    const userId = req.user._id

    validateRequiredFields({ blogId });

    // check if blog exists
    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found")
    }

    await Bookmark.create({
        user: userId,
        blog: blogId
    })

    return res.status(200).json(
        new ApiResponse(200, "This blog is bookmarked")
    )

})

export const removeBookMarkedBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // find the blog
    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
        throw new ApiError("404", "User have not bookmarked the blog of provided Id")
    }

    await Bookmark.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, "Blog is removed")
    )
})