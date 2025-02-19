"use client"

import { createBoard } from "@/lib/services/boardServices"
import { getMyUser } from "@/lib/services/userServices";

import Header from "@/components/header/header";
import CreateBoardButton from "@/components/boards/createBoardBtn"

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

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getMyUser();
        setUser(result);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
      }
    };

    getUser();
  }, []);

  const handleClickLogin = () => {
    router.push("/auth");
  };

  const createBoard = async () => {

    try{

      const result = await createBoard()
      console.log("page log: crated board", result)


    } catch (error) {
      console.error("Erro ao criar quadro:", error);
    }

  }

  return (
    <>
      <Header userInfo={user}></Header>
      <div className="ml-20 mr-20 bg-slate-100">

        <div className="pt-10 mb-20">
          <h1>
            <strong>Olá, {user?.name}</strong>. Que bom  ter você de volta! 😊
          </h1>
        </div>

        <div>
          <h1><strong>Meus Boards</strong></h1>

          <CreateBoardButton></CreateBoardButton>
        </div>
        
      </div>
    </>
  );
}
