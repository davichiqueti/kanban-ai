"use client";

import { getMyBoards } from "@/lib/services/boardServices";
import { getMyUser } from "@/lib/services/userServices";

import Header from "@/components/header/header";
import MyBoardsGrid from "@/components/boards/homePage/myBoardsGrid"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { User } from "@/types/user/userType"
import { Board } from "@/types/board/boardtype"



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

  const handleCreateBoard = async () => {
    const fetchCreatedBoard = async () => {
      try {
        const result = await getMyBoards()
        setBoards(result)

      } catch (error) {
        console.error("Error ao atualizar os boards: ", error)
      }
    }

  }

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

          <h1>
            <strong>Meus Boards</strong>
          </h1>

          <MyBoardsGrid boards={boards} onNewBoard={handleCreateBoard} />
          
        </div>
      </div>
    </>
  );
}
