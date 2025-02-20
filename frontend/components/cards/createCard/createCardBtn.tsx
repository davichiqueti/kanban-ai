
import { useState } from "react";

import CreateCardModal from "./createCardModal";

interface CreateBoardButtonProps {
    boardId: string | string[] | undefined
}

export default function CreateBoardButton({ boardId }: CreateBoardButtonProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleCloseModal = () => setModalOpen(false)

    return(
        <>
            <button 
                className="flex flex-row items-center justify-between
                            p-4 bg-blue-500 text-blue-50 
                            rounded-xl hover:scale-105 transition delay-75 "
                onClick={() => setModalOpen(true)}
            >

                <p>Novo Card</p>
            </button>

            {modalOpen && <CreateCardModal onClose={handleCloseModal} boardId={boardId} />}


        </>
    )
}
