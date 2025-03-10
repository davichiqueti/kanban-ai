
import { Card, BoardCardStatus } from "@/types/card/cardType";
import { useState } from "react"

import { updateBoardCard, deleteBoardCard } from "@/lib/services/cardServices"

import { AiOutlineEdit } from "react-icons/ai";

interface CardModalProps {
  card: Card;
  onClose: () => void;
  onBoardChange: () => void
}

export default function CardModal({ card, onClose, onBoardChange }: CardModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false)
  const [isEditingPriority, setIsEditingPriority] = useState<boolean>(false)
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number>()
  const [status, setStatus] = useState("")

  

  const handleUpdateCard = async (field: string, value: string | number) => {

    try {

      const updateData = { [field]: value };

      const response = await updateBoardCard(card.board_id, card.id, updateData)

      Object.assign(card, updateData);
      onBoardChange();

    } catch (error) {
      console.error("Erro updating card: ", error)
    }
  }

  const handleDeleteCard = async () => {
    try {
      const response = await deleteBoardCard(card.board_id, card.id)
      onBoardChange()
      onClose()

    } catch (error) {
      console.error("Erro updating card: ", error)
    }

  }

  const priorityMap: Record<number, { text: string; color: string }> = {
    1: { text: "Low", color: "bg-blue-300" },
    2: { text: "Medium", color: "bg-yellow-300" },
    3: { text: "High", color: "bg-green-400" },
  };
  const cardPriority = priorityMap[card.priority ?? 0] || { text: "Desconhecida", color: "bg-gray-500" };

  const statusTitles: Record<BoardCardStatus, string> = {
    backlog: "Backlog",
    "to do": "To Do",
    doing: "Doing",
    review: "Review",
    done: "Done",
  };
  const cardStatus = statusTitles[card.status]

  return (

    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >

      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Close
        </button>

        {/* ---------- title ---------- */}

        <div id="title-info" className="mb-4">
          <div className="flex flex-row gap-2 group items-center">
            <h1>Title:</h1>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="ml-2 mr-2 flex flex-row gap-1 items-center opacity-0 pointer-events-none transition-opacity duration-300 
              group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-slate-200 p-1 rounded"
            >
              <AiOutlineEdit />
              <p>Edit</p>
            </button>
          </div>

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
                    setTitle("")
                  }}
                >Save</button>

                <button
                  className="py-1 px-3 bg-slate-200 border rounded-lg"
                  onClick={() => {
                    setIsEditingTitle(false);
                    setTitle("")
                  }}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p className="ml-2">{card.title}</p>
            </div>
          )}
        </div>

        {/* ---------- description ---------- */}

        <div id="description-info" className="mb-4">
          <div className="flex flex-row gap-2 group items-center">
            <h1>Description:</h1>
            <button
              onClick={() => setIsEditingDescription(true)}
              className="ml-2 mr-2 flex flex-row gap-1 items-center opacity-0 pointer-events-none transition-opacity duration-300 
              group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-slate-200 p-1 rounded"
            >
              <AiOutlineEdit />
              <p>Edit</p>
            </button>
          </div>

          {isEditingDescription ? (
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=" p-1 mb-2 border-2 rounded w-full outline-none focus:border-blue-500 "
                autoFocus
              />

              <div className="flex gap-4">
                <button
                  className="py-1 px-3 bg-blue-500 border rounded-lg text-white"
                  onClick={() => {
                    handleUpdateCard("description", description);
                    setIsEditingDescription(false);
                    setDescription("")

                  }}
                >Save</button>

                <button
                  className="py-1 px-3 bg-slate-200 border rounded-lg"
                  onClick={() => setIsEditingDescription(false)}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p className="ml-2">{card.description}</p>
            </div>
          )}
        </div>

        {/* ---------- priority ---------- */}

        <div id="priority-info" className="mb-2">
          <div className="flex flex-row gap-2 group items-center mb-1">
            <h1>Priority:</h1>
            <button
              onClick={() => setIsEditingPriority(true)}
              className="ml-2 mr-2 flex flex-row gap-1 items-center opacity-0 pointer-events-none transition-opacity duration-300 
              group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-slate-200 p-1 rounded"
            >
              <AiOutlineEdit />
              <p>Edit</p>
            </button>
          </div>

          {isEditingPriority ? (
            <div className="">
              <div className="mb-2 ml-2">
                <label htmlFor="low">
                  <input
                    type="radio"
                    id="low"
                    name="priority"
                    value="1"
                    checked={priority === 1}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                  Low
                </label>
                <br></br>
                <label htmlFor="medium">
                  <input
                    type="radio"
                    id="medium"
                    name="priority"
                    value="2"
                    checked={priority === 2}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                  Medium
                </label>
                <br></br>
                <label htmlFor="high">
                  <input
                    type="radio"
                    id="high"
                    name="priority"
                    value="3"
                    checked={priority === 3}
                    onChange={(e) => setPriority(Number(e.target.value))}
                  />
                  High
                </label>
              </div>

              <button
                className="py-1 px-3 bg-blue-500 border rounded-lg text-white"
                onClick={() => {
                  handleUpdateCard("priority", priority ?? 1);
                  setIsEditingPriority(false);
                  setPriority(priority)
                }}
              >Save</button>

              <button
                className="py-1 px-3 bg-slate-200 border rounded-lg"
                onClick={() => {
                  setIsEditingPriority(false);
                  setPriority(undefined)
                }}
              >Cancel</button>
            </div>
          ) : (
            <div>
              <span className={`px-2 py-1 ml-2 rounded text-white ${cardPriority.color}`}>
                {cardPriority.text}
              </span>

            </div>
          )
          }

        </div>

        {/* ---------- Status ----------  */}

        <div id="status-info" className="mb-2">
          <div className="mb-1 flex flex-row gap-2 group items-center">
            <h1>Status:</h1>
            <button
              onClick={() => setIsEditingStatus(true)}
              className="ml-2 mr-2 flex flex-row gap-1 items-center opacity-0 pointer-events-none transition-opacity duration-300 
              group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-slate-200 p-1 rounded"
            >
              <AiOutlineEdit />
              <p>Edit</p>
            </button>
          </div>

          {isEditingStatus ? (
            <div className="">
              <div className="mb-2 ml-2">
                <label htmlFor="backlog">
                  <input
                    type="radio"
                    id="backlog"
                    name="status"
                    value="backlog"
                    checked={status === "backlog"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Backlog
                </label>
                <br></br>
                <label htmlFor="to do">
                  <input
                    type="radio"
                    id="to do"
                    name="status"
                    value="to do"
                    checked={status === "to do"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  To do
                </label>
                <br></br>
                <label htmlFor="doing">
                  <input
                    type="radio"
                    id="doing"
                    name="status"
                    value="doing"
                    checked={status === "doing"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Doing
                </label>
                <br></br>
                <label htmlFor="review">
                  <input
                    type="radio"
                    id="review"
                    name="status"
                    value="review"
                    checked={status === "review"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Review
                </label>
                <br></br>
                <label htmlFor="done">
                  <input
                    type="radio"
                    id="done"
                    name="status"
                    value="done"
                    checked={status === "done"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Done
                </label>
              </div>

              <button
                className="py-1 px-3 bg-blue-500 border rounded-lg text-white"
                onClick={() => {
                  handleUpdateCard("status", status);
                  setIsEditingStatus(false);
                  setStatus(status)
                }}
              >Save</button>

              <button
                className="py-1 px-3 bg-slate-200 border rounded-lg"
                onClick={() => {
                  setIsEditingStatus(false);
                  setStatus("")
                }}
              >Cancel</button>
            </div>
          ) : (

            <div>
              <span className="px-2 py-1 ml-2 border border-black rounded" >
                {cardStatus}
              </span>
            </div>
          )
          }

        </div>

        {/* ---------- dates ---------- */}

        <div className="flex justify-between mt-4 mb-4">
          <div>
            {card.created_at && (
              <p className="text-sm text-gray-500">
                Created at: {new Date(card.created_at).toLocaleDateString()}
              </p>
            )}
            {card.due_date && (
              <p className="text-sm text-gray-500">
                Due date: {new Date(card.due_date).toLocaleDateString()}
              </p>
            )}
          </div>

          <button
            onClick={handleDeleteCard}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete Card
          </button>
        </div>

      </div>
    </div>
  );
}
