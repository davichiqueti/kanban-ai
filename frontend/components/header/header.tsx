
import { useState } from "react";

import HeaderDropdown from "./headerDropdown";

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


    return (
        <header className="flex flex-row justify-between pt-10 mb-0 pl-10 pr-10 border-b-2 shadow-sm">
            <div>
                <h1>Kanban.ai</h1>
            </div>
            <div
                className="relative"
                onMouseEnter={() => setModalOpen(true)}
                onMouseLeave={() => setModalOpen(false)}
            >
                <p
                    className="ml-4 cursor-pointer text-blue-500 hover:underline"

                >Perfil</p>

                {modalOpen &&
                    <HeaderDropdown userInfo={userInfo} setModalOpen={setModalOpen} />

                }
            </div>

        </header>
    );
}

