import { toast } from "react-toastify"

export const putService = async (endpoint, body = {}, token, headers = {}) => {
    try {

        const isFormData = body instanceof FormData;

        const response = await fetch(`${BASE_URL}${endpoint}`,{
            method: "PUT",
            headers: {
                ...(isFormData?{}:{
                    "Content-Type":"application/json"
                }),
                ...(token && {
                    Authorization:`Bearer ${token}`
                }),

                ...headers
            },

            body:isFormData?body:JSON.stringify(body)
        })

        return response

    } catch (error) {
        toast.error("Internal server error")
    }
}