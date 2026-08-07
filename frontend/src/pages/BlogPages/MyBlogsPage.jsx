import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getBlogsByStatus } from './BlogService';
import { FiFileText } from 'react-icons/fi';
import { FaArchive, FaPenSquare } from 'react-icons/fa';
import BlogCard from '../../Components/BlogCard/BlogCard';

const MyBlogsPage = () => {
    const { user, token } = useSelector(
        (state) => state.auth
    )
    const [blogType, setBlogType] = useState("PUBLISHED") //published or draft or archieved
    const [blogs, setBlogs] = useState(null);

    const tabs = [
        {
            label: "Published",
            value: "PUBLISHED",
            icon: <FiFileText size={18} />
        },
        {
            label: "Drafts",
            value: "DRAFT",
            icon: <FaPenSquare size={18} />,
        },
        {
            label: "Archived",
            value: "ARCHIVED",
            icon: <FaArchive size={18} />,
        },
    ]

    useEffect(() => {
        getBlogs()
    }, [blogType])

    const getBlogs = async () => {
        try {
            const params = {
                userId: user._id,
                page: 1,
                limit: 5,
                status: blogType
            }
            const response = await getBlogsByStatus(params, token)

            const result = await response.json()
            setBlogs(result.data)

        } catch (error) {
            console.log("err ", error);
        }
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <div>
                <div>
                    <h1 className="text-3xl font-bold mb-6">Stories</h1>
                </div>
                <div className="flex border-b border-gray-200  mb-6 w-full">
                    {tabs.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setBlogType(tab.value)}

                            className={`w-1/3 p-2 cursor-pointer ${blogType === tab.value ? "bg-black/20 text-white shadow-lg" : " text-white hover:bg-black/20"
                                }`}
                        >
                            {/* {tab.icon} */}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
                {blogs ? <>
                    {blogs.map((blog) => {
                        return (
                            <BlogCard key={blog._id} blog={blog} />
                        )
                    })}
                </> : <p>
                    No blogs present!
                </p>}
            </div>
        </div>
    )
}

export default MyBlogsPage
