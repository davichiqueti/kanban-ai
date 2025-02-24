
import { Board } from "@/types/board/boardtype";
import { useRouter } from "next/navigation";
import CreateBoardButton from "@/components/boards/homePage/createBoard/createBoardBtn";


interface MyBoardsGridprops {
    boards: Board[]
    onNewBoard: () => void
}

export default function MyBoardsGrid({ boards, onNewBoard }: MyBoardsGridprops) {
    const router = useRouter()

    const handleBoardClick = (id: number) => {
        router.push(`/board/${id}`);
    };

    

    return (
        <div>
            <div className="mb-4">
                <CreateBoardButton  onNewBoard={onNewBoard}/>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <div
                            key={board.id}
                            onClick={() => handleBoardClick(board.id)}
                            className="p-4 bg-blue-200 border border-blue-700 rounded-lg 
                    shadow-md hover:scale-105 transition delay-75"
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
        </div>
    )
}
