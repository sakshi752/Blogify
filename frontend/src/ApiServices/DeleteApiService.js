import { BASE_URL } from "../utils"

export const deleteService = async (endpoint, token) => {
    try {

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            }
        })

        return response;

    } catch (error) {
        console.error(error ? error : "Internal server error")
    }
}