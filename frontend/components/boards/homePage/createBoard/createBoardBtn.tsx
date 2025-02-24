
import { useState } from "react";
import CreateBoardModal from "./createBoardModal"

import { IoIosAddCircleOutline } from "react-icons/io";

interface CreateBoardButtonProps {
    onNewBoard: () => void
}

export default function CreateBoardButton({ onNewBoard }: CreateBoardButtonProps) {
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

                <IoIosAddCircleOutline />
                <p>Novo Board</p>
            </button>

            {modalOpen &&  <CreateBoardModal onClose={handleCloseModal} onNewBoard={onNewBoard} /> }
        </>
    )
}
