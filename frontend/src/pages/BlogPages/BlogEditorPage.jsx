import { useState } from "react";
import BlogEditor from "../../Components/BlogEditor/BlogEditor";
import { addBlog } from "./BlogService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogEditorPage = () => {
    const { user, token } = useSelector(
        (state) => state.auth
    );
    // console.log("user ",user);
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [preview, setPreview] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onCoverImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setCoverImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const zhandleSubmit = async (status) => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(content));
        formData.append("status", status);
        formData.append("coverImage", coverImage);

        await addBlog(formData,dispatch,navigate,token,user.username)

    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div>
                {preview && (
                    <img
                        src={preview}
                        alt="Cover preview"
                        className="w-64 h-64 object-cover rounded-lg"
                    />
                )}
                <label className=" cursor-pointer">

                    <span className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                        Upload Picture
                    </span>

                    <input
                        type="file"
                        className="hidden"
                        onChange={(event) => onCoverImageChange(event)}
                    />

                </label>
            </div>


            <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-5xl font-bold bg-transparent outline-none mt-6"
            />

            <BlogEditor
                content={content}
                setContent={setContent}
            />

            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => handleSubmit("DRAFT")}
                    className="bg-gray-500 px-6 py-2 rounded"
                >
                    Draft
                </button>

                <button
                    onClick={() => handleSubmit("PUBLISHED")}
                    className="bg-blue-600 px-6 py-2 rounded"
                >
                    Publish
                </button>
            </div>
        </div>
    );
};

export default BlogEditorPage;