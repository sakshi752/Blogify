import { toast } from "react-toastify"
import { postService } from "../../ApiServices/PostApiService"
import { ENDPOINTS } from "../../utils"
import { login, logout } from "../../redux/features/auth/authSlice"

export const registerUserService = async (requestBody, dispatch,navigate) => {
    try {
        const res = await postService(`${ENDPOINTS.USER + ENDPOINTS.REGISTER} `, requestBody)

        const data = await res.json()
        if (res.status === 200 || data.statusCode ===200) {
            toast.success(data.message ? data.message : "User is registered!")
            navigate("/login")
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }

    } catch (error) {
        toast.error("Internal server error")
    }
}


export const loginUserService = async (requestBody, dispatch, navigate) => {
    try {
        const response = await postService(`${ENDPOINTS.USER + ENDPOINTS.LOGIN}`, requestBody);
        const data = await response.json();

        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "You are logged in!")
            dispatch(
                login({
                    user: data?.data?.user,
                    token: data?.data?.accessToken,
                    isAuthenticated: data.success,
                })
            );
            navigate("/dashboard")
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}

export const logoutUserService = async ( dispatch, navigate,token) => {
    try {
        const response = await postService(`${ENDPOINTS.USER + ENDPOINTS.LOGOUT}`, {},token);
        const data = await response.json();
        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "You are logged out!")
            dispatch(
                logout()
            );
            navigate("/")
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}