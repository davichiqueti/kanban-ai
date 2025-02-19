
import api from "./api"

export const createBoard = async (boardData: {name: string, description: string}) => {

    try{
        const response = await api.post("/boards", boardData)
        return response.data

    }catch(error){
        console.error("Error creating board", error)
    }
}

export const getMyBoards = async () => {

    try{
        const response = await api.get("/boards")
        return response.data

    }catch(error){
        console.error("Error creating board", error)
    }
} 
