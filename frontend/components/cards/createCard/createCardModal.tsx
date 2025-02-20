import { useState } from "react";

import { addBoardCard } from "@/lib/services/cardServices";

interface CreateCardModalProps {
    onClose: () => void;
    boardId: string | string[] | undefined;
}

export default function CreateCardModal({ onClose, boardId }: CreateCardModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("backlog");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const id = Number(boardId);

            if (isNaN(id)) {
                console.error("Board ID inválido.");
                return;
            }

            const cardData = {
                title,
                description,
                status,
                priority: Number(priority),
                due_date: new Date(dueDate),
            };

            const response = await addBoardCard(id, cardData);

            console.log("Card criado com sucesso:", response);
            onClose();
        } catch (error) {
            console.error("Erro ao criar card", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
            <div className="bg-white p-6 pt-2 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="text-red-500">Fechar</button>
                <h1><strong>Crie seu Card!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        className="border rounded p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        className="border rounded p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        className="border rounded p-2 w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="backlog">Backlog</option>
                        <option value="to do">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                    </select>

                    <label htmlFor="priority">Prioridade:</label>
                    <select
                        
                        id="priority"
                        className="border rounded p-2 w-full"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>


                    <label htmlFor="dueDate">Data de Vencimento:</label>
                    <input
                        type="date"
                        id="dueDate"
                        className="border rounded p-2 w-full"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
                        Criar Card
                    </button>

                </form>
            </div>
        </div>
    );
}
