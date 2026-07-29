import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUserService } from '../../pages/LoginAndRegisterPage/LoginRegisterApiService';
import { toast } from 'react-toastify';

const ProfileMenu = () => {
    const { token } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch()
    // dispatch(logout({}))
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            logoutUserService(dispatch, navigate, token)
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <div className='absolute right-0 mt-3 w-72 rouded-xl shadow-2xl border overflow-hidden z-50 bg-blue-100 rounded'>
            <div className='flex flex-col text-blue-950'>
                <NavLink className="p-3 text-lg" to="/profile">
                    My Profile
                </NavLink>
                <NavLink className="p-3 text-lg" to="/profile">
                    Dashboard
                </NavLink>
                <NavLink className="p-3 text-lg" to="/settings/update-user">
                    Settings
                </NavLink>
            </div>

            <div className='bg-blue-400 p-5 flex items-center justify-center ' onClick={handleLogout}>
                <button className="rounded-b-lg text-2xl font-semibold w-full cursor-pointer">
                    Logout
                </button>
            </div>

        </div>
    )
}

export default ProfileMenu
