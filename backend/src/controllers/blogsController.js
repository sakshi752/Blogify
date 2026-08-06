import Blog from "../modals/Blog.js";
import { deleteOldFile, uploadRequiredFiles } from "../services/global.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateRequiredFields } from "../utils/validators.js";

export const createBlog = asyncHandler(async (req, res) => {
    let { title, content, status } = req.body;

    validateRequiredFields({ title, content });

    const parsedContent = JSON.parse(content);

    if (!['DRAFT', 'PUBLISHED'].includes(status)) {
        status = 'DRAFT';
    }

    const uploadedImgFile = await uploadRequiredFiles(req.file);

    const blog = await Blog.create({
        title,
        content: parsedContent,
        author: req.user._id,
        status,
        coverImage: {
            url: uploadedImgFile.url,
            publicId: uploadedImgFile.public_id
        }
    });

    return res.status(200).json(
        new ApiResponse(200, "Blog created successfully", { blogId: blog._id })
    );
});

export const updateBlog = asyncHandler(async (req, res) => {
    const { id, title, content, status } = req.body;

    const blog = await Blog.findOne({ _id: id });

    if (!blog) throw new ApiError(404, "Blog not found")

    if (title && blog.title !== title) {
        blog.title = title
    }

    if (content && blog.content !== content) {
        blog.content = content
    }

    if (status && blog.status === "DRAFT" && status === "PUBLISHED") {
        blog.status = "PUBLISHED"
    }

    if (req.file) {
        // Save old avatar publicId
        await deleteOldFile(blog.coverImage)

        // upload on cloudinary
        const uploadedImgFile = await uploadRequiredFiles(req.file);

        // Update user with new avatar
        blog.coverImage = {
            url: uploadedImgFile.url,
            publicId: uploadedImgFile.public_id
        };
    }

    await blog.save();

    return res.status(200).json(
        new ApiResponse(200, "Blog updated successfully",)
    )
})

export const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // find the blog
    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError(404, "Blog not found")
    }

    // check if current user ownss the blog or not
    if (blog.author !== req.user._id) {
        throw new ApiError(403, "You are not authorized to delete this blog")
    }

    // delete the blog image if present
    if (blog.coverImage?.publicId) {
        await deleteOldFile(blog.coverImage)
    }

    // delete blog from the data
    await Blog.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, "Blog deleted successfully")
    )
})

export const getAllBlogs = asyncHandler(async (req, res) => {
   
})

export const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    validateRequiredFields({ id });

    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError("404", "Blog not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "",
                blog,
            )
        );
})