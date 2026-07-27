import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { logoutUserService } from '../pages/LoginAndRegisterPage/LoginRegisterApiService';
import { logout } from '../redux/features/auth/authSlice';

const Header = () => {
  const { isAuthenticated, user,token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch()
  // dispatch(logout({}))
  const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
      logoutUserService( dispatch,navigate,token)
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <nav className='flex justify-between px-40 pt-5'>
      <div className='flex items-end gap-5'>
        <NavLink to="/" className={"text-2xl font-bold tracking-widest"}>Blogify</NavLink>
        {/* search */}
        <div className='shadow-lg'>
          <input type="text" className='bg-gray-200 rounded outline-none p-1' placeholder='Search' />
        </div>
      </div>
      <div className='flex gap-5'>
        {isAuthenticated ?<>
        <button onClick={handleLogout} className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Logout</button>
        </>: <>
          <NavLink to="/login" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign In</NavLink>
          <NavLink to="/register" className={"bg-blue-500 text-white rounded text-lg shadow-xl flex items-center px-3"}>Sign Up</NavLink>
        </>}

      </div>
    </nav>
  )
}

export default Header
