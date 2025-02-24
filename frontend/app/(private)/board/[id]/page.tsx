"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getBoardById } from "@/lib/services/boardServices"
import KanbanBoard from "@/components/boards/boardsPage/kanbanBoard"

import { Board } from "@/types/board/boardtype"


export default function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBoard()
  }, [id]);

  const handleBoardChange = async ()  => {
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


  if (loading) {
    return <p className="text-center text-gray-500">Carregando board...</p>;
  }

  if (!board) {
    return <p className="text-center text-red-500">Board não encontrado.</p>;
  }

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50">

      <div className="mb-4">

        <h1 className="text-2xl font-bold">{board.name}</h1>
        <p className="text-gray-600">{board.description}</p>
        <p className="text-xs text-gray-400">
          Criado em: {new Date(board.created_at).toLocaleDateString()}
        </p>

      </div>


      <div className="flex-grow overflow-auto">

        <KanbanBoard board={board} onBoardChange={handleBoardChange}  />

      </div>

    </div>
  );

}
