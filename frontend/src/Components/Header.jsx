import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { TfiWrite } from "react-icons/tfi";
import { IoIosNotifications } from "react-icons/io";
import { logout } from '../redux/features/auth/authSlice';


const Header = () => {
  const { isAuthenticated, user, token } = useSelector(
    (state) => state.auth
  );
  // console.log("user ",user)
  // const dispatch = useDispatch()
  // dispatch(logout())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className='border-b-1 border-gray-400 pb-4 shadow-md'>
      <div className='flex justify-between px-40 pt-5'>
        <div className='flex items-end gap-5'>
          <NavLink to="/" className={"text-2xl font-bold tracking-widest"}>Blogify</NavLink>
          {/* search */}
          <div className='shadow-lg'>
            <input type="text" className='bg-gray-200 rounded outline-none p-1' placeholder='Search' />
          </div>
        </div>
        <div className='flex gap-5'>
          {isAuthenticated ? <>
            <div className='flex items-center justify-center gap-3'>
              <NavLink to={"/write-blog"}  className='bg-blue-400 p-2 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow shadow-white'>
                <TfiWrite size={30} />
                <span>Write</span>
              </NavLink>
              <div className='bg-blue-400 p-2 rounded-full cursor-pointer shadow shadow-white'>
                <IoIosNotifications size={30} />
              </div>
              <div className='relative shadow-white' ref={menuRef}>
                <img
                  src={user?.avatar?.url}
                  alt={user?.fullname || "User Avatar"}
                  className="w-12 h-12 rounded-full object-cover border border-gray-300 cursor-pointer"
                  loading="lazy"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                {isMenuOpen && <ProfileMenu />}

              </div>
            </div>


          </> : <>
            <NavLink to="/login" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign In</NavLink>
            <NavLink to="/register" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign Up</NavLink>
          </>}

        </div>
      </div>

    </nav>
  )
}

export default Header
