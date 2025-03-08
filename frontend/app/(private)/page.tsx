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
    fetchCreatedBoard()
  }

  return (
    <>

      <Header userInfo={user}></Header>

      <div className=" mt-10 ml-20 mr-20">

        <div className="mb-10">
          <h1>
            <strong>Hello, {user?.name}</strong>. It's great to have you back! 😊
          </h1>
        </div>

        <div>

          <h1 className="mb-2">
            <strong>My Boards</strong>
          </h1>

          <MyBoardsGrid boards={boards} onNewBoard={handleCreateBoard} />
          
        </div>
      </div>
    </>
  );
}
