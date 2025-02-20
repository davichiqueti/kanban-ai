
import { useState, useEffect } from "react"

import { Board } from "@/types/board/boardtype"
import { Card, BoardCardStatus, Column } from "@/types/card/cardType"


const columnTitles: Record<BoardCardStatus, string> = {
    backlog: "Backlog",
    "to do": "To Do",
    doing: "Doing",
    review: "Review",
    done: "Done",
  };

interface KanbanBoardProps {
    board: Board,
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
    const [columns, setColumns] = useState<Column[]>([])

    useEffect(() => {
        if (board?.cards) {
          
          const initialColumns: Column[] = Object.keys(columnTitles).map((status) => ({
            id: status as BoardCardStatus,
            title: columnTitles[status as BoardCardStatus],
            cards: [],
          }));

          board.cards.forEach((card: Card) => {
            const columnIndex = initialColumns.findIndex((col) => col.id === card.status);
            if (columnIndex !== -1) {
              initialColumns[columnIndex].cards.push(card);
            }
          });
    
          setColumns(initialColumns);
        }
      }, [board]);


    return (
         <div className="flex gap-4 p-4 overflow-x-auto">
      {columns.map((column) => (
        <div key={column.id} className="bg-gray-200 p-4 rounded-md w-1/5">
          <h2 className="font-bold text-lg mb-2">{column.title}</h2>
          <div className="space-y-2">
            {column.cards.map((card) => (
              <div key={card.id} className="bg-white p-2 rounded shadow">
                <h3 className="font-medium">{card.title}</h3>
                {card.description && <p className="text-sm">{card.description}</p>}
                {card.due_date && <p className="text-xs text-gray-500">Due: {card.due_date}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    )
}
