import React from "react";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { RiBookMarkedFill, RiBookMarkedLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  console.log("blog ", blog);
  const username = blog.author.username;
  const id = blog._id;

  return (
    <NavLink to={`/${username}/blogs/${id}`}>
      <div className="flex flex-col md:flex-row gap-5 p-5 mb-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
        {/* Cover image */}

        <div className="md:w-64 shrink-0">
          <img
            src={blog.coverImage?.url}
            alt={blog.title}
            className="w-full h-52 object-cover rounded-xl"
          />
        </div>

        {/* Content */}

        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center mb-2 gap-3" >
                <NavLink className="flex items-center gap-2" to={`/${username}`}>
                  <div className="relative h-7 w-7 rounded-full overflow-hidden group">
                    <img className="h-full w-full" src={blog.author.avatar.url} alt={blog.author.fullname} />
                    {/* Black transparent overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>

                  <h1 className="text-[16px] hover:underline">
                    {blog.author.fullname}
                  </h1>
                </NavLink>

                <span className="text-gray-400 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button onClick={}>
                <RiBookMarkedLine size={30}/>
              </button>
            </div>
            <h2 className="text-2xl font-bold">{blog.title}</h2>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${blog.status === "PUBLISHED" ? "text-green-400 bg-green-500/20" : "text-yellow-400 bg-yellow-500/20"}`}
                >
                  {blog.status}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <FaRegHeart />
                <span>{blog.likesCount || 0}</span>
              </div>

              <div className="flex items-center gap-1">
                <FaRegCommentDots />
                <span>{blog.commentsCount || 0}</span>
              </div>
            </div>

            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Read more
            </button>
          </div>
        </div>
      </div>
    </NavLink>

  );
};

export default BlogCard;