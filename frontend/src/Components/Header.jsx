import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex justify-between px-40 pt-5'>
      <div className='flex items-end gap-5'>
        <NavLink to="/" className={"text-2xl font-bold tracking-widest"}>Blogify</NavLink>
        {/* search */}
        <div className='shadow-lg'>
          <input type="text" className='bg-gray-200 rounded outline-none p-1' placeholder='Search'/>
        </div>
      </div>
      <div className='flex gap-5'>
        <NavLink to="/login" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign In</NavLink>
        <NavLink to="/register" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign Up</NavLink>
      </div>
    </nav>
  )
}

export default Header
