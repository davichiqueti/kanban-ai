
import { useState, useEffect } from "react"

import { Board } from "@/types/board/boardtype"
import { Card, BoardCardStatus, Column } from "@/types/card/cardType"

import CardComponent from "@/components/cards/boardCard/cardComponent"
import CreateardButton from "@/components/cards/createCard/createCardBtn"



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

    <div className="flex flex-col h-full">

    <div className="ml-2">
      <CreateardButton boardId={board.id} />
    </div>

      <div className="flex gap-2 flex-grow overflow-x-auto">
        {columns.map((column) => (

          <div key={column.id} className="p-2 pt-3 w-1/5">

            <div className="flex justify-normal text-md mb-2 pl-2 py-1 border-2 rounded-md">
 
              <h2 className="mr-3" >{column.title}</h2>
              <span className="">
                <span className="bg-slate-300 p-1 rounded-full">
                  {column.cards.length}
                </span>
              </span>

            </div>

            <div className="bg-slate-200 space-y-3 p-3 rounded-md flex-grow">
              {column.cards.map((card) => (

                <div key={card.id}  >
                  <CardComponent key={card.id} card={card} />
                </div>

              ))}

            </div>
          </div>

        ))}

      </div>
    </div>
  )
}
