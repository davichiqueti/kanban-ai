
import { Board } from "@/app/page";

interface MyBoardsGridprops {
    boards: Board[]
}

export default function MyBoardsGrid({ boards }: MyBoardsGridprops ) {

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.length > 0 ? (
              boards.map((board) => (
                <div 
                  key={board.id} 
                  className="p-4 bg-white shadow-md rounded-lg"
                >

                  <h2 className="font-bold text-lg">{board.name}</h2>
                  <p className="text-gray-500">{board.description}</p>
                  <p className="text-xs text-gray-400">
                    Criado em: {new Date(board.created_at).toLocaleDateString()}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">Carregando boards.</p>
            )}
          </div>
    )
}
