"use client";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import Feed from "@/components/Feed";
import { useSearchParams } from "next/navigation";

interface IPost {
  id: number;
  post_desc: string;
  img: string;
  username: string;
  userImg: string;
  created_at: string;
  userId: number;
}

function Profile({searchParams}: { searchParams: { id?: string } }) {
  const profileQuery = useQuery({
    queryKey: ["profile", searchParams.id],
    queryFn: () =>
      makeRequest.get("user/get-user?id=" + searchParams.id).then((res) => {
        console.log(res.data);
        return res.data[0];
      }),
  });

  if (profileQuery.error) {
    console.log(profileQuery.error);
  }

    const postQuery = useQuery<IPost[] | undefined>({
    queryKey: ["post"],
    queryFn: () =>
      makeRequest.get("post/?id="+searchParams.id).then((res) => {
        return res.data.data;
      }),
  });

  if (postQuery.error) {
    console.log(postQuery.error);
  }


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
          <span className="text-2xl font-bold pl-2">{profileQuery.data?.username}</span>
        </div>
      </div>
      <div className="pt-36 w-3/5">
        <Feed post={postQuery.data}/>
      </div>
    </div>
  );
}

export default Profile;
