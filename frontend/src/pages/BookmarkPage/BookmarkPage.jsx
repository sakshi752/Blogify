import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BookmarkPage = () => {

  const { user, token } = useSelector(
    (state) => state.auth
  )
  const [bookmarkedBlogs,setBookmarkedBlogs] = useState(null);

  useEffect(()=>{
    getBookmarkedBlogs();
  },[])

  const getBookmarkedBlogs = async ()=>{
    
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div>
        <h1 className="text-3xl font-bold mb-6">Bookmarked Blogs</h1>
        <div>

        </div>
      </div>
    </div>
  )
}

export default BookmarkPage
