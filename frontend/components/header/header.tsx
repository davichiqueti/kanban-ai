
import { useState } from "react";
import { set } from "zod";

interface User {
    name: string;
    username: string;
    email: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    id: string;
}

interface HeaderProps {
    userInfo: User | null
}



export default function Header({ userInfo }: HeaderProps) {
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    return (

        <header className="flex flex-row justify-between m-10 mb-0">
            <div>
                <h1>Kanban.ai</h1>
            </div>
            <div className="flex flex-row">

                <p>Seja Bem-vindo, {userInfo?.name}</p>
                <p 
                    className="ml-4"
                    
                >Perfil</p>
            </div>
        </header>

    )
}
