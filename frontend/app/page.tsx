"use client";

import { getMyBoards } from "@/lib/services/boardServices";
import { getMyUser } from "@/lib/services/userServices";

import Header from "@/components/header/header";
import CreateBoardButton from "@/components/boards/createBoardBtn";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface User {
  name: string;
  username: string;
  email: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  id: string;
}

export interface Board {
  id: number;
  name: string;
  description: string;
  created_at: string;
  user_links: any[];
  cards: any[];
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUserAndBoards = async () => {
      try {
        const result = await getMyUser();
        setUser(result);

        if (result) {
          const userBoards = await getMyBoards();
          setBoards(userBoards);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário ou boards:", error);
        setUser(null);
      }
    };

    fetchUserAndBoards();
  }, []);

  return (
    <>

      <Header userInfo={user}></Header>

      <div className="ml-20 mr-20">

        <div className="pt-10 mb-20">
          <h1>
            <strong>Olá, {user?.name}</strong>. Que bom ter você de volta! 😊
          </h1>
        </div>

        <div>
          <CreateBoardButton />

          <h1>
            <strong>Meus Boards</strong>
          </h1>

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
              <p className="text-gray-500 text-center col-span-3">Nenhum board encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
