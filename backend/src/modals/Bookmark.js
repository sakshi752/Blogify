import mongoose, { Mongoose } from "mongoose";

const bookMarkScehma = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        blog:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog",
            required:true
        }
    }, {
    timestamps: true
})

const Bookmark = mongoose.model("Bookmark", bookMarkScehma)

export default Bookmark