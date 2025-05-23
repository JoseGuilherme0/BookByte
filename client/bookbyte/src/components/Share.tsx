'use client'

import { UserContext } from "@/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { makeRequest } from "../../axios";

function Share() {

    const {user} = useContext(UserContext)
    const [post_desc, setDesc] = useState('');
    const [postImg, setPostImg] = useState('');
    const [img, setImg] = useState<File|null>(null);

    const queryClient = useQueryClient()

    useEffect(()=>{
        if(img){
            setPostImg(URL.createObjectURL(img))
        }
    },[img])

    const mutation = useMutation({
        mutationFn: async (newPost:{})=>{
            await makeRequest.post("post/", newPost).then((res)=>{
                return res.data
            })
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['post']})

        }
    });

    const upload = async ()=>{
        try{
            const formData = new FormData
            img && formData.append('file', img)
            const res = await makeRequest.post('upload/', formData)
            return res.data
        } catch(error){
            console.log(error)
        }
    }

    const sharePost = async() =>{
        let imgUrl = ''
        if(img){
            imgUrl = await upload()
        }
        mutation.mutate({post_desc, img: imgUrl, userId: user?.id})
        setDesc('')
        setImg(null)
    }

    return ( 
        <div className=" bg-white rounded-lg p-4 shadow-md flex flex-col gap-3 w-full">
            {img && <img className="rounded-lg" src={postImg} alt="imagem do post" /> }
            <div className="flex gap-4 pt-6">
                    <img
                      src={
                        user?.userImg
                          ? user.userImg
                          : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                      }
                      alt="Imagem do perfil"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full">
                      <input placeholder={`No que você esta pensando ${user?.username}`}
                        value={post_desc}
                        type="text"
                        className="bg-zinc-100 w-full focus-visible:outline-none"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                      <button onClick={()=> sharePost()}>
                        <FaPaperPlane />
                      </button>
                      
                    </div>
                  </div>
                  <div className="flex justify-around py-4 text-gray-600 border-y">
                          <input className="hidden" type="file" id="img" onChange={(e) => e.target.files && setImg(e.target.files[0])}/>
                          <label htmlFor="img" className="flex" >
                            <TbPhoto className="text-2xl" />
                            Adicionar Imagem
                            </label>
                          <button className="flex items-center gap-1">
                            <FaUserFriends className="text-2xl"/>
                            Marcar Amigo
                          </button>
                        </div>
        </div>
     );
}

export default Share;