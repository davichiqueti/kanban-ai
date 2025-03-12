"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getBoardById, updateBoard } from "@/lib/services/boardServices"

import KanbanBoard from "@/components/boards/boardsPage/kanbanBoard"

import { Board } from "@/types/board/boardtype"

import { AiOutlineEdit } from "react-icons/ai";


export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const board = await getBoardById(Number(id))

        if (board) {
          setBoard(board);
          console.log(board.id, board.cards)
        } else {
          console.error("Board não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar boards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBoard()
  }, [id]);

  const handleBoardChange = async () => {
    const fetchBoard = async () => {
      try {
        const board = await getBoardById(Number(id))

        if (board) {
          setBoard(board);
        } else {
          console.error("Board não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar boards:", error);
      }
    };
    fetchBoard()
  }

  const handleUpdateBoardInfo = async (field: string, value: string) => {

    try {
      const updateData = { [field]: value };

      const result = await updateBoard(Number(id), updateData)


    } catch (error) {
      console.error("Erro ao atualizar o board:", error)
    }
  }

  if (loading) {
    return <p className="text-center text-gray-500">Carregando board...</p>;
  }

  if (!board) {
    return <p className="text-center text-red-500">Board não encontrado.</p>;
  }

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50">

      <div className="mb-4">

        <div>
          {isEditingName ? (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" p-1 mb-2 border-2 rounded w-full outline-none focus:border-blue-500 "
                autoFocus
              />

              <div className="flex gap-4">
                <button
                  className="py-1 px-3 bg-blue-500 border rounded-lg text-white"
                  onClick={() => {
                    handleUpdateBoardInfo("name", name);
                    setIsEditingName(false);
                    setName("")
                  }}
                >Save</button>

                <button
                  className="py-1 px-3 bg-slate-200 border rounded-lg"
                  onClick={() => {
                    setIsEditingName(false);
                    setName("")
                  }}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <h1 className="text-2xl font-bold">{board.name}</h1>
              <button
                onClick={() => setIsEditingName(true)}
                className="ml-2 mr-2  flex items-center opacity-0 transition-opacity duration-300  hover:opacity-100 hover:bg-slate-200 p-1 rounded"
              >
                <AiOutlineEdit />
              </button>
            </div>
          )}
        </div>

        <div>
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
                    handleUpdateBoardInfo("description", description);
                    setIsEditingDescription(false);
                    setDescription("")
                  }}
                >Save</button>

                <button
                  className="py-1 px-3 bg-slate-200 border rounded-lg"
                  onClick={() => {
                    setIsEditingDescription(false);
                    setDescription("")
                  }}
                >Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <p className="text-gray-600">{board.description}</p>
              <button
                onClick={() => setIsEditingDescription(true)}
                className="ml-2 mr-2  flex items-center opacity-0 transition-opacity duration-300  hover:opacity-100 hover:bg-slate-200 p-1 rounded"
              >
                <AiOutlineEdit />
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400">
          Created at: {new Date(board.created_at).toLocaleDateString()}
        </p>

      </div>

      <div className="flex-grow overflow-auto">
        <KanbanBoard board={board} onBoardChange={handleBoardChange} />
      </div>

    </div>

  );
}
