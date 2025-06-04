"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import Feed from "@/components/Feed";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { IPost, IFriendship } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";
import AuthInput from "@/components/AuthInput";

function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [followed, setFollowed] = useState(false);
  const [username, setUsername] = useState("");
  const [userImg, setUserImg] = useState("");
  const [bgImg, setBgImg] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["profile", id],
    queryFn: () =>
      makeRequest.get("user/get-user?id=" + id).then((res) => {
        setUsername(res.data[0].username);
        setUserImg(res.data[0].userImg);
        setBgImg(res.data[0].bgImg);
        return res.data[0];
      }),
    enabled: !!id,
  });

  const postQuery = useQuery<IPost[] | undefined>({
    queryKey: ["post", id],
    queryFn: () =>
      makeRequest.get("post/?id=" + id).then((res) => res.data.data),
    enabled: !!id,
  });

  const FriendshipQuery = useQuery({
    queryKey: ["friendship", id],
    queryFn: () =>
      makeRequest.get("friendship/?follower_id=" + user?.id).then((res) => {
        res.data.data.find((e: IFriendship) => {
          if (id && e.followed_id === +id) {
            setFollowed(true);
          }
        });
        return res.data.data;
      }),
    enabled: !!user?.id && !!id,
  });

  if (FriendshipQuery.error) {
    console.log(FriendshipQuery.error);
  }

  const mutation = useMutation({
    mutationFn: async (unfollow: {
      follower_id: number;
      followed_id: number;
      followed: boolean;
    }) => {
      if (followed) {
        return await makeRequest
          .delete(
            `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
          )
          .then((res) => {
            setFollowed(false);
            return res.data;
          });
      } else {
        return await makeRequest
          .post(`friendship/`, {
            follower_id: unfollow.follower_id,
            followed_id: unfollow.followed_id,
          })
          .then((res) => {
            setFollowed(true);
            return res.data;
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendship", id] }); // perfil visitado
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["friendship", user.id] });
      }
    },
  });

  const editProfileMutation = useMutation({
    mutationFn: async (data: {
      username: string;
      userImg: string;
      bgImg: string;
      id: number;
    }) => {
      return makeRequest.put(`user/update-user`, data).then((res) => {
        if (user) {
          const newUser = {
            id: user.id,
            username: data.username,
            userImg: data.userImg,
            bgImg: data.bgImg,
            email: user.email,
          };
          setUser(newUser);
          return res.data;
        }
      });
    },
    onSuccess: () => {
      setEditProfile(false);
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
    },
  });

  return (
    <div className="w-3/5 flex flex-col items-center">
      <div className="relative">
        <img
          className="rounded-xl"
          src={
            profileQuery.data?.bgImg
              ? profileQuery.data.bgImg
              : "https://th.bing.com/th/id/R.0065d42f4349d2ffdcce16e22e7e9c4a?rik=h5yH%2fslzdTnATQ&riu=http%3a%2f%2fwww.wixeq.com%2fwp-content%2fuploads%2f2017%2f12%2fsem-imagem.jpg&ehk=d32D9mtcYvZSbd1xnS2Qv6kSPoqLi98uqHWp%2fPTZnt8%3d&risl=&pid=ImgRaw&r=0"
          }
          alt=""
        />
        <div className="flex absolute bottom-[-110px] left-10 items-center">
          <img
            className="w-40 h-40 rounded-full border-zinc-100 border-4"
            src={
              profileQuery.data?.userImg
                ? profileQuery.data.userImg
                : "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }
            alt=""
          />
          <span className="text-2xl font-bold pl-2">
            {profileQuery.data?.username}
          </span>
        </div>
      </div>
      <div className="pt-36 w-3/5 flex flex-col items-center gap-4">
        {id && user?.id != +id ? (
          <button
            onClick={() =>
              user &&
              mutation.mutate({
                followed,
                followed_id: +id,
                follower_id: user?.id,
              })
            }
            className={`w-1/2 rounded-md py-2 font-semibold ${
              followed
                ? "bg-zinc-300 hover:text-black"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {followed ? "Deixar de seguir" : "Seguir"}
          </button>
        ) : (
          <button
            className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black`}
            onClick={() => setEditProfile(true)}
          >
            Editar Perfil
          </button>
        )}
        {editProfile && (
          <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">
            <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
              <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">
                Editar Perfil
                <button onClick={() => setEditProfile(false)}>
                  <FaTimesCircle className="text-red-600" />
                </button>
              </header>
              <form className="w-2/3 py-8 flex flex-col gap-8">
                <AuthInput label="Nome:" newState={setUsername} />
                <AuthInput label="Imagem de Perfil:" newState={setUserImg} />
                <AuthInput label="Imagem de Fundo:" newState={setBgImg} />
                <button
                  className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black self-center`}
                  onClick={(e) => {
                    e.preventDefault();
                    id &&
                      editProfileMutation.mutate({
                        username,
                        userImg,
                        bgImg,
                        id: +id,
                      });
                  }}
                >
                  Editar Perfil
                </button>
              </form>
            </div>
          </div>
        )}
        <Feed post={postQuery.data} />
      </div>
    </div>
  );
}

export default Profile;
