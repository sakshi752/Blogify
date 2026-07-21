import mongoose, { Mongoose } from "mongoose";

const bookMarkScehma = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        blogId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog",
            required:true
        }
    }, {
    timestamps: true
})

const Bookmark = mongoose.model("Bookmark", bookMarkScehma)

export default Bookmark