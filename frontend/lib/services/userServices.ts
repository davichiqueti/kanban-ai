
import api from "./api"

export const getMyUser = async () => {

    try{
        const token = localStorage.getItem("token")

        if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

        const response = await api.get("/users/me")
        console.log("Dados do Usuario",  response.data)
        return response.data

    }catch(error){
        console.error("Error getting your info", error)
    }
}

export const getOtherUser = async (username: {username: string}) => {

    try{
        const token = localStorage.getItem("token")

        if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

        const response = await api.get(`/users/${username}`)

        return response.data

    }catch(error){
        console.error("Error getting user", error)
    }
}
