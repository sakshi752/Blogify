import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBlogsofLoggedInUser } from './ProfilePageApiService';
import BlogCard from '../../Components/BlogCard/BlogCard';

const ProfilePage = () => {
  const { user, token } = useSelector(
    (state) => state.auth
  );
  const [blogs, setBlogs] = useState(null)
  useEffect(() => {
    getBlogs();
  }, [])

  const getBlogs = async () => {
    try {
      const params = {
        userId: user._id,
        page: 1,
        limit: 5
      }
      const response = await getBlogsofLoggedInUser(params, token);
      const result = await response.json();
      setBlogs(result.data);

    } catch (error) {
      console.log("err ", error);
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
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

        <div className="lg:col-span-4 flex justify-end">
          <div className="sticky top-10 w-full max-w-sm h-1/2 bg-blue-400/20 backdrop-blur-md p-6 rounded-lg">

            <div className='flex items-center justify-center'>
              <img src={user.avatar.url} alt={user.fullname}
                className='w-52 h-52 object-cover rounded-full'
              />
            </div>

            <h1 className="text-2xl font-bold text-center mt-4">
              {user.fullname}
            </h1>

            <p className="text-center text-gray-400">
              @{user.username}
            </p>

            <p className="mt-4 text-center">
              {user.bio}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">

              <div>
                <h2 className="font-bold">{user.blogsCount}</h2>
                <p>Posts</p>
              </div>

              <div>
                <h2 className="font-bold">{user.followersCount}</h2>
                <p>Followers</p>
              </div>

              <div>
                <h2 className="font-bold">{user.followingCount}</h2>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProfilePage
