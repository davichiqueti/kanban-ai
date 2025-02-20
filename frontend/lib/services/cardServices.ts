
import api from "./api"


export const addBoardCard = async ( 
                                    cardId: number, 
                                    cardData: {title: string, description: string, status: string, priority: number, due_date: Date}
                                ) => {

    try{
        const response = await api.post(`/boards/${cardId}/cards`, cardData)
        console.log("Response: card data", response.data)
        return response.data

    }catch(error){
        console.error("Error creating board card", error)
    }
}
