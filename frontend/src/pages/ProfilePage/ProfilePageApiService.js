import { toast } from "react-toastify"
import { ENDPOINTS } from "../../utils";
import { getService } from "../../ApiServices/GetApiService";
import { data } from "react-router-dom";

export const getBlogsofLoggedInUser = async (params, token) => {
    try {
        const queryParams = new URLSearchParams(params).toString();

        const response = await getService(
            `${ENDPOINTS.BLOGS}?${queryParams}`,
            token
        );

        if (response.status === 200 || data.statusCode === 200) {
            return response;
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}