import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUserService } from '../../pages/AuthPage/LoginRegisterApiService';
import { toast } from 'react-toastify';

const ProfileMenu = () => {
    const { token, user } = useSelector(
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
        <div className='absolute right-0 mt-3 w-72 rouded-xl shadow-2xl border overflow-hidden z-50 bg-blue-100 rounded py-7 px-4 text-gray-700'>
            <div>
                <NavLink to={"/profile"} className="flex items-center space-x-5 cursor-pointer">
                    <div>
                        <img
                            src={user?.avatar?.url}
                            alt={user?.fullname || "User Avatar"}
                            className="w-16 h-16 rounded-full object-cover border border-gray-300 cursor-pointer"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <p className='text-xl font-semibold'>{user.fullname}</p>
                        <span>view profile</span>
                    </div>

                </NavLink>
            </div>
            {/* <div className='flex flex-col text-blue-950'>
                <NavLink className=" text-lg" to="/settings/update-user">
                    Settings
                </NavLink>
            </div> */}

            <div className=' p-5 flex items-center justify-center ' onClick={handleLogout}>
                <button className="rounded-b-lg text-2xl font-semibold w-full cursor-pointer">
                    Logout
                </button>
            </div>

        </div>
    )
}

export default ProfileMenu
