"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getMyBoards } from "@/lib/services/boardServices"

export interface Board {
    id: number;
    name: string;
    description: string;
    created_at: string;
    user_links: any[];
    cards: any[];
}

export default function Board() {
    const { id } = useParams();
    const [board, setBoard] = useState<Board | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const allBoards = await getMyBoards()
                const pageBoard = allBoards.find((b: Board) => String(b.id) === id);

                if (pageBoard) {
                    console.log(pageBoard)
                    setBoard(pageBoard);
                } else {
                    console.error("Board não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar boards:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBoard();

    }, [id]);

}