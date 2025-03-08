
import { useState, useEffect } from "react"

import { Board } from "@/types/board/boardtype"
import { BoardCardStatus, Column } from "@/types/card/cardType"

import CardComponent from "@/components/cards/boardCard/cardComponent"
import CreateCardButton from "@/components/cards/createCard/createCardBtn"
import SortCardDropdown from "@/components/boards/boardsPage/sortCardDropdown"
import { useStyleRegistry } from "styled-jsx"



const columnTitles: Record<BoardCardStatus, string> = {
  backlog: "Backlog",
  "to do": "To Do",
  doing: "Doing",
  review: "Review",
  done: "Done",
};

interface KanbanBoardProps {
  board: Board,
  onBoardChange: () => void
}


export default function KanbanBoard({ board, onBoardChange }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>([])
  const [sort, setSort] = useState<boolean>(false)
  const [sortType, setSortType] = useState<string | null>(null);


  useEffect(() => {

    if (board?.cards) {
      let sortedCards = [...board.cards];

      if (sortType === "creation" || sortType === null) {
        sortedCards.sort((a, b) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
      } else if (sortType === "due") {
        sortedCards.sort((a, b) => {
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        });
      } else if (sortType === "priority") {
        sortedCards.sort((a, b) => b.priority - a.priority);
      }

      const columns = Object.keys(columnTitles).map((status) => ({
        id: status as BoardCardStatus,
        title: columnTitles[status as BoardCardStatus],
        cards: sortedCards.filter((card) => card.status === status),
      }));

      setColumns(columns);
    }
  }, [board, sortType]);

  const handleSortCards = (type: string) => {
    setSortType(type);
    setSort(false)

  }


  return (

    <div className="flex flex-col h-full">

      <div className="ml-2 flex justify-between items-center">
        <CreateCardButton boardId={board.id} onBoardChange={onBoardChange} />

        <div className="relative">
          <h1 
            className="border rounded px-6 py-2 hover:bg-white "
            onMouseDown={() => setSort(true)}
            onMouseLeave={() => setSort(false)}
          >Order by:</h1>

          {sort && <SortCardDropdown setSort={setSort} handleSort={handleSortCards}/>}
        </div>

      </div>

      <div className="flex flex-grow overflow-x-auto ">
        {columns.map((column) => (

          <div key={column.id} className="p-2 pt-3 w-1/5 flex flex-col">

            <div className="flex justify-normal text-md mb-2 pl-2 py-1 border-2 rounded-md ">
              <h2 className="mr-3" >{column.title}</h2>
              <span className="">
                <span className="bg-slate-300 p-1 rounded-full">
                  {column.cards.length}
                </span>
              </span>
            </div>

            <div className="bg-slate-200 space-y-3 p-3 rounded-md  overflow-y-auto max-h-[500px] scrollbar-hide">
              {column.cards.map((card) => (

                <div key={card.id}  >
                  <CardComponent key={card.id} card={card} onBoardChange={onBoardChange} />
                </div>

              ))}

            </div>
          </div>

        ))}

      </div>
    </div>
  )
}
