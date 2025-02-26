
import { Card } from "@/types/card/cardType";
import { useState } from "react"

import { updateBoardCard } from "@/lib/services/cardServices"

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  const [titleField, setTitleField] = useState("")
  const [descriptionField, setDescriptionField] = useState("")
  const [statusField, setstatusField] = useState("")
  const [priorityField, setPriorityField] = useState("")
  const [dueDateField, setDueDateField] = useState("")


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");


  const handleUpdateCard = async () => {

    try {

      const updateData = {"title":"titul"}

      const response = await updateBoardCard( card.board_id, card.id, updateData )


    } catch (error) {
      console.error("Erro updating card: ", error)
    }
  }
  
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">

      <div>
        <p>{card.title}</p>
        <button  ></button>
      </div>

        <p className="text-sm text-gray-700 mb-4">{card.description}</p>

        {card.due_date && (
          <p className="text-sm text-gray-500">
            Due date: {new Date(card.due_date).toLocaleDateString()}
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
