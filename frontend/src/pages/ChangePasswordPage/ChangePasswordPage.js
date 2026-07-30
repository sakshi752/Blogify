import { toast } from "react-toastify";
import { patchService } from "../../ApiServices/PatchApiService"
import { ENDPOINTS } from "../../utils";

export const changePwService = async (requestBody, dispatch, navigate, token) => {
    try {
        const response = await patchService(`${ENDPOINTS.USER + ENDPOINTS.CHANGE_PASSWORD}`, requestBody,token);
        const data = await response.json();

        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "Password is changed successfully!")
            navigate("/")
        }else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }

    } catch (error) {
        toast.error("Internal server error")
    }
}

