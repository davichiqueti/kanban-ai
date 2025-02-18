
import api from "./api"

export const createBoard = async () => {

    try{
        const token = localStorage.getItem("token")

        if (!token) {
            throw new Error("Token de autenticação não encontrado");
          }

        const response = await api.post("/boards")
        console.log("Board criado ", response.data)
        return response.data

    }catch(error){
        console.error("Error creating board", error)
    }
}