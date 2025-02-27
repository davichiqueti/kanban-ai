
import { Card } from "@/types/card/cardType";
import { useState } from "react"

import { updateBoardCard } from "@/lib/services/cardServices"

import { AiOutlineEdit } from "react-icons/ai";

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const [title, setTitle] = useState("");


  const handleUpdateCard = async (field: string, value: string) => {

    try {

      const updateData = { [field]: value };

      const response = await updateBoardCard(card.board_id, card.id, updateData)

    } catch (error) {
      console.error("Erro updating card: ", error)
    }
  }

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">

        <div id="title-info" className="mb-4">
          <h1>* Title:</h1>
          {isEditingTitle ? (
            <div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" p-1 mb-2 border-2 rounded w-full outline-none focus:border-blue-500 "
                autoFocus
              />

              <div className="flex gap-4">
                <button
                  className="py-1 px-3 bg-blue-500 border rounded-lg text-white"
                  onClick={() => {
                    handleUpdateCard("title", title);
                    setIsEditingTitle(false);

                  }}
                >Save</button>

                <button
                  className="py-1 px-3 bg-slate-200 border rounded-lg"
                  onClick={() => setIsEditingTitle(false)}
                >Cancel</button>
              </div>
            </div>

          ) : (
            <div className="flex flex-row gap-2 mb-4 group items-center">
              <p>{card.title}</p>

              <button
                onClick={() => setIsEditingTitle(true)}
                className="ml-2 mr-2 flex flex-row gap-1 items-center opacity-0 pointer-events-none transition-opacity duration-300 
                        group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-slate-200 p-1 rounded"
              >
                <AiOutlineEdit />
                <p>Edit</p>
              </button>

            </div>
          )}


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
