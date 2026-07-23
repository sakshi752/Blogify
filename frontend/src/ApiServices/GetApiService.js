import { BASE_URL } from "../utils";

export const getService = async (endpoint,token)=>{
    try {

        const response = await fetch(`${BASE_URL}${endpoint}`,{
            method:'GET',
            headers:{
                'Content-Type':"application/json",
                ...(token && {Authorization: `Bearer ${token}`})
            }
        })

        return response;
        
    } catch (error) {
         console.error("Internal server error");
    }
}