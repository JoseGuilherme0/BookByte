"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { TbMessageCircleFilled } from "react-icons/tb";
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/UserContext";
import { IUser } from "@/interfaces";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [searchResults, setSearchResult] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return await makeRequest.post("auth/logout").then((res) => {
        res.data;
      });
    },
    onSuccess: () => {
      setUser(undefined);
      localStorage.removeItem("bookbyte:user");
      router.push("/login");
    },
  });

  const { data, error } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      makeRequest.get(`search/search-users?params=${search}`).then((res) => {
        return res.data;
      }),
    enabled: !!search,
  });

  if (error) {
    console.log(error);
  }

  return (
    <header className="fixed z-10 w-full bg-white flex justify-between py-2 px-4 items-center shadow-md ">
      <Link href="/main" className="font-bold text-sky-900 text-lg ">
        BOOKBYTE
      </Link>
      <div
        className="flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full relative"
        onClick={() => setSearchResult(true)}
        onMouseLeave={() => setSearchResult(false)}
      >
        <input
          type="text"
          placeholder="Pesquisar"
          className="bg-zinc-100 focus-visible:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search ? search : ""}
        />
        <FaSearch />
        {search && searchResults && (
          <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-0 left-0 top-[100%]">
            {data?.map((users: IUser, id: number) => {
              return (
                <Link
                  href={"/profile?id=" + users.id}
                  key={id}
                  className="flex items-center gap-2"
                  onClick={() => {
                    setSearch(null), setSearchResult(false);
                  }}
                >
                  <img
                    src={
                      users.userImg
                        ? users.userImg
                        : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                    }
                    alt="Imagem do perfil"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-bold">{users.username}</span>
                </Link>
              );
            })}
            <Link
              href={"/search?params=" + search}
              onClick={() => {
                setSearch(null), setSearchResult(false);
              }}
              className=" font-semibold border-t border-zinc-300 text-center pt-2"
            >
              Ver todos resultados
            </Link>
          </div>
        )}
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
        <div className="relative" onMouseLeave={() => setShowMenu(false)}>
          <button
            className="flex gap-2 items-center"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={
                user
                  ? user.userImg
                  : "https://img.freepik.com/free-icon/user_318-159711.jpg"
              }
              alt="Imagem do perfil"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold">{user?.username}</span>
          </button>
          {showMenu && (
            <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-8px]">
              <Link href="" className="border-b">
                Editar perfil
              </Link>
              <button onClick={() => mutation.mutate()}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
