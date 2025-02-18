
import { useState } from "react";

import HeaderInfoModal from "./headerInfoModal";

export interface User {
    name: string;
    username: string;
    email: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    id: string;
}

interface HeaderProps {
    userInfo: User | null;
}

export default function Header({ userInfo }: HeaderProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <header className="flex flex-row justify-between pt-10 mb-0 pl-10 pr-10 bg-slate-300">
            <div>
                <h1>Kanban.ai</h1>
            </div>
            <div className="flex flex-row">
                <p>Seja Bem-vindo, {userInfo?.name}</p>
                <p 
                    className="ml-4 cursor-pointer text-blue-500 hover:underline"
                    onClick={handleOpenModal}
                >
                    Perfil
                </p>
            </div>

            {modalOpen && <HeaderInfoModal openModal={modalOpen} closeModal={handleCloseModal} userInfo={userInfo} />}
        </header>
    );
}
