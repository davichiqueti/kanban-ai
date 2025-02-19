
import api from "./api"

export const getMyUser = async () => {

    try{
        const response = await api.get("/users/me")
        return response.data

    }catch(error){
        console.error("Error getting your info", error)
    }
}

export const getOtherUser = async (username: {username: string}) => {

    try{
        const response = await api.get(`/users/${username}`)
        return response.data

    }catch(error){
        console.error("Error getting user", error)
    }
}
