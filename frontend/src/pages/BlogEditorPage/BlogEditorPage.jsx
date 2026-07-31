import { useState } from "react";
import BlogEditor from "../../Components/BlogEditor/BlogEditor";

const BlogEditorPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = async (status) => {
        const formData = new FormData();
        console.log("content ",content)
        formData.append("title", title);
        formData.append("content", JSON.stringify(content));
        formData.append("status", status);

        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">

            <label className="mt-6 cursor-pointer">

                <span className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                    Upload Picture
                </span>

                <input
                    type="file"
                    className="hidden"
                    // onChange={(event) => onAvatarChange(event)}
                />

            </label>

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