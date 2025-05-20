import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  FaAlignLeft,
  FaBookmark,
  FaCalendar,
  FaFlag,
  FaPeopleArrows,
  FaStore,
  FaUserFriends,
} from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";

function Sidebar() {

const {user} =useContext(UserContext)

  return (
    <aside className="pl-4">
      <nav className="flex flex-col gap-6 text-gray-600 font-semibold">
        <Link href="" className="flex gap-2 pb-6 items-center">
        <img
              src={
                user?.userImg
                  ? user.userImg
                  : "https://img.freepik.com/free-icon/user_318-159711.jpg"
              }
              alt="Imagem do perfil"
              className="w-8 h-8 rounded-full"
            />
          <span>{user?.username}</span>
        </Link>
        <Link href="" className="flex gap-3 items-center">
          <FaUserFriends className="w-6 h-6"/> Amigos
        </Link>
        <Link href=""  className="flex gap-3 items-center">
          <FaAlignLeft className="w-6 h-6"/> Feed
        </Link>
        <Link href=""  className="flex gap-3 items-center">
          <FaPeopleArrows className="w-6 h-6"/>
          Grupos
        </Link>
        <Link href=""  className="flex gap-3 items-center">
          <FaStore className="w-6 h-6"/>
          Loja
        </Link>
        
       
        {/*<Link href=""  className="flex gap-3 items-center">
          <FaBookmark className="w-6 h-6"/>
          Salvo
        </Link>
        <Link href=""><FaFlag/>Página</Link>
        <Link href=""><FaCalendar/>Eventos</Link>
        <Link href=""><TbClockHour4/>Lembranças</Link>*/}
      </nav>
    </aside>
  );
}

export default Sidebar;
