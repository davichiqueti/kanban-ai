
import api from "./api";

export const signup  = async (userData: {name: string, username: string, email: string, password: string }) => {

    try{
        const response = await api.post("/auth/signup", userData);
        return response.data;

    } catch(error){
        console.error("Error signing up", error)
    }

}