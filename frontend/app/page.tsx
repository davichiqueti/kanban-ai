"use client"

import Image from "next/image";

import {useRouter} from "next/navigation"

export default function Home() {

  const router = useRouter()

  const handleClick = () => {
    router.push("/auth")
  }
    
  return (

    <div className="m-20">
      
      <h1>hello world</h1>

      <button onClick={handleClick}>login</button>
    </div>
  );
}
