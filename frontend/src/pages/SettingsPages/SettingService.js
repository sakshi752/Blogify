import { toast } from "react-toastify";
import { patchService } from "../../ApiServices/PatchApiService"
import { ENDPOINTS } from "../../utils";
import { login } from "../../redux/features/auth/authSlice";

export const changePwService = async (requestBody, dispatch, navigate, token) => {
    try {
        const response = await patchService(`${ENDPOINTS.USER + ENDPOINTS.CHANGE_PASSWORD}`, requestBody,token);
        const data = await response.json();

        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "Password is changed successfully!")
            // navigate("/")
        }else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }

    } catch (error) {
        toast.error("Internal server error")
    }
}

export const updateAvatarService = async (requestBody, dispatch, navigate, token) => {
    try {
        const response = await patchService(`${ENDPOINTS.USER + ENDPOINTS.UPDATE_AVATAR}`, requestBody, token);
        const data = await response.json();
        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "Your profile pic is updated!")
            dispatch(
                login({
                    user: data?.data,
                    token,
                    isAuthenticated: true,
                })
            );
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}

export const updateUserDetails = async (requestBody, dispatch, navigate, token) => {
    try {
        const response = await patchService(`${ENDPOINTS.USER + ENDPOINTS.UPDATE_USER}`, requestBody, token);
        const data = await response.json();
        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "User details are updated!")
            dispatch(
                login({
                    user: data?.data,
                    token,
                    isAuthenticated: true,
                })
            );
        } else {
       
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        
        toast.error("Internal server error")
    }
}