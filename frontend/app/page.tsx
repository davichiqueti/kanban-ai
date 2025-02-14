"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getMyUser } from "@/lib/services/userServices";

interface User {
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

  const handleClick = () => {
    router.push("/auth");
  };

  return (
    <div className="m-20">
      <h1>Hello World</h1>

      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>Usuário: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Status: {user.active ? "Ativo" : "Inativo"}</p>
        </div>
      ) : (
        <p>Carregando usuário...</p>
      )}

      <button onClick={handleClick}>Login</button>
    </div>
  );
}
