
import api from "./api"


export const addBoardCard = async (
    boardId: number,
    cardData: { title: string, description: string, status: string, priority: number, due_date: Date }
) => {

    try {
        const response = await api.post(`/boards/${boardId}/cards`, cardData)
        return response.data

    } catch (error) {
        console.error("Error creating board card: ", error)
    }
}

export const updateBoardCard = async (
    boardId: number,
    cardId: number,
    cardData: Partial<{ title: string, description: string, status: string, priority: number, due_date: Date }>
) => {

    try {

        const response = await api.put(`/boards/${boardId}/cards/${cardId}`, cardData)
        return response.data

    } catch (error) {
        console.error("Error updating board card:  ", error)
    }
}