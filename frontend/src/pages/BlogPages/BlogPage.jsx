import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getBlogById } from "./BlogService";

const BlogPage = () => {
  const { token } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [blog, setBlog] = useState(null);


  // Tiptap editor (read only)
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editable: false,
  });


  // Fetch blog by id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id, token);

        const result = await response.json();

        setBlog(result.data);

      } catch (error) {
        console.error("Failed to fetch blog", error);
      }
    };


    if (id) {
      fetchBlog();
    }

  }, [id, token]);



  // Load API content into Tiptap
  useEffect(() => {
    if (editor && blog?.content) {
      editor.commands.setContent(blog.content);
    }
  }, [editor, blog]);



  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl">
          Loading...
        </h2>
      </div>
    );
  }



  return (
    <div className="min-h-screen ">

      <article className="
        max-w-4xl 
        mx-auto 
        px-5 
        py-10
      ">


        {/* Cover Image */}
        <img
          src={blog.coverImage?.url}
          alt={blog.title}
          className="
            w-full
            h-[420px]
            object-cover
            rounded-2xl
          "
        />



        {/* Title */}
        <h1 className="
          text-5xl
          font-bold
          mt-8
          leading-tight
        ">
          {blog.title}
        </h1>



        {/* Author + Date */}
        <div className="
          flex
          gap-3
          items-center
          text-gray-500
          mt-5
        ">

          <span>
            Published
          </span>

          <span>
            •
          </span>

          <span>
            {new Date(blog.createdAt).toDateString()}
          </span>

        </div>



        <hr className="my-8"/>



        {/* Blog Content */}
        <div
          className="
            prose
            prose-lg
            max-w-none
          "
        >
          <EditorContent editor={editor}/>
        </div>


      </article>

    </div>
  );
};


export default BlogPage;