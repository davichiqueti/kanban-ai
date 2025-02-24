
import { useState } from "react";

import { createBoard } from "@/lib/services/boardServices"

interface CreateBoardModalProps {
    onClose: () => void;
    onNewBoard: () => void
}

export default function CreateBoardModal({ onClose, onNewBoard }: CreateBoardModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = { name, description }

            const response = await createBoard(data);

            console.log("Board criado log", response);

            onNewBoard()
            onClose();

        } catch (error) {
            console.error("Erro ao criar board", error);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
            <div className="bg-white p-6 pt-2 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="text-red-500">Fechar</button>
                <h1><strong>Crie seu Board!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="border rounded p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        className="border rounded p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
                        Criar Board
                    </button>
                </form>
            </div>
        </div>
    );
}
