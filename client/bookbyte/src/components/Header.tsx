"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { TbMessageCircleFilled } from "react-icons/tb";
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/UserContext";

function Header() {
  const {user, setUser} = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter();

const mutation = useMutation({
  mutationFn: async ()=>{
    return await makeRequest.post("auth/logout").then((res)=>{
      res.data;
    })
  },
  onSuccess: () =>{
    setUser(undefined)
    localStorage.removeItem("bookbyte:user");
    router.push("/login")
  },
})

  return (
    <header className="w-full bg-white flex justify-between py-2 px-4 items-center shadow-md ">
      <Link href="/" className="font-bold text-sky-900 text-lg ">
        BOOKBYTE
      </Link>
      <div className="flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-zinc-100 focus-visible:outline-none"
        />
        <FaSearch />
      </div>
      <div className="flex gap-5 items-center text-gray-600">
        <div className="flex gap-3 ">
          <button className="bg-zinc-200 p-2 rounded-full houver:bg-zinc-300">
            <TbMessageCircleFilled />
          </button>
          <button className="bg-zinc-200 p-2 rounded-full houver:bg-zinc-300">
            <FaBell />
          </button>
        </div>
        <div className="relative" onMouseLeave={()=>setShowMenu(false)}>
          <button className="flex gap-2 items-center" onClick={() =>setShowMenu(!showMenu)}>
            <img
              src={
                user?
                  user.userImg
                  : "https://img.freepik.com/free-icon/user_318-159711.jpg"
              }
              alt="Imagem do perfil"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold">{user?.username}</span>
          </button>
          {showMenu && (
          <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-8px]">
            <Link href='' className="border-b">Editar perfil</Link>
            <button onClick={() =>mutation.mutate()}>Sair</button>
          </div>
)}
        </div>
      </div>
    </header>
  );
}

export default Header;
