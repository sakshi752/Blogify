import { toast } from "react-toastify";
import { postService } from "../../ApiServices/PostApiService";
import { ENDPOINTS } from "../../utils";
import { getService } from "../../ApiServices/GetApiService";

export const addBlog = async (requestBody, dispatch, navigate, token, userId) => {
    try {
        const response = await postService(`${ENDPOINTS.BLOGS}`, requestBody, token);
        const data = await response.json();
        if (response.status === 200 || data.statusCode === 200) {
            toast.success(data.message ? data.message : "Blog is created!")
            const id = data.data?.blogId;
            navigate(`/${userId}/blogs/${id}`)
        } else {

            toast.error(data.messuploadedFileage ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}

export const getBlogById = async (id, dispatch, token) => {
    try {
        const response = await getService(
            `${ENDPOINTS.BLOGS}/${id}`,
            token
        );

        return response;
    } catch (error) {
        toast.error("Internal server error")
    }
}