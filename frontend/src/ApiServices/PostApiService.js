import { BASE_URL, } from "../utils";
import { toast } from "react-toastify"

export const postService = async (endpoint, body = {}, token, headers = {}) => {
    try {
        const isFormData = body instanceof FormData;
        console.log("dasd",isFormData)

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...(token && {
                    Authorization: `Bearer ${token}`
                }),
                ...headers
            },

            body: isFormData ? body : JSON.stringify(body)
        })

        return response
    } catch (error) {
        toast.error("Internal server error")
    }
}