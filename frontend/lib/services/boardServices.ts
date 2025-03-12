
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

export const getBoardById = async ( boardId: number ) => {

    try {
        const response = await api.get(`/boards/${boardId}`)
        return response.data

    } catch (error) {
        console.error("Erro ao pegar informações do board.", error)
    }
}

export const updateBoard = async (
    boardId: number,
    boardData: Partial<{ name: string, description: string }>
) => {

    try {

        console.log(boardId, boardData)
        const response = await api.put(`/boards/${boardId}`, boardData)
        return response.data

    } catch (error) {
        console.error("Error updating board:  ", error)
    }
}