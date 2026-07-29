import { toast } from "react-toastify";
import { patchService } from "../../ApiServices/PatchApiService"

const changePw = async (requestBody, dispatch, navigate) => {
    try {
        const response = await patchService(`${ENDPOINTS.USER + ENDPOINTS.LOGIN}`, requestBody);
        const data = await response.json();

        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "Password is changed successfully!")
        }
        navigate("/")
    } catch (error) {
        toast.error("Internal server error")
    }
}