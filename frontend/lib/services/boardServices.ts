
import api from "./api"

export const createBoard = async (boardData: {name: string, description: string}) => {

    try{

        const response = await api.post("/boards", boardData)
        console.log("Board criado ", response.data)
        return response.data

    }catch(error){
        console.error("Error creating board", error)
    }
}

export const getMyBoards = async () => {

    try{

        const response = await api.get("/boards")
        console.log("Meus boards ", response.data)
        return response.data

    }catch(error){
        console.error("Error creating board", error)
    }
} 
