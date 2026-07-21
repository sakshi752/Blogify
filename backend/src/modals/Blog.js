import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },

    coverImage: {
        url:{
            type:String,
            default:""
        },
        publicId:{
            type:String,
            default:""
        }
    },

    status: {
        type: String,
        enum: ["DRAFT", "PUBLISHED"],
        default: "PUBLISHED"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
{
    timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;