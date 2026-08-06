import { toast } from "react-toastify"
import { ENDPOINTS } from "../../utils";
import { getService } from "../../ApiServices/GetApiService";

export const getBlogsofLoggedInUser = async (params,token)=>{
    try {
        const queryParams = new URLSearchParams(params).toString();

        const response = await getService(
                    `${ENDPOINTS.BLOGS}?${queryParams}`,
                    token
                );
        
                return response;
    } catch (error) {
        toast.error("Internal server error")
    }
}