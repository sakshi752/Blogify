import { getService } from "../../ApiServices/GetApiService"

export const getBookmarkService = async (id, token) => {
    try {
        const response = await getService(`${ENDPOINTS.BLOGS}/${id}`, token)

        if (response.status === 200 || data.statusCode === 200) {
            return response
        } else {
            toast.error(data.message ? data.message : "Something went wrong!")
        }
    } catch (error) {
        toast.error("Internal server error")
    }
}