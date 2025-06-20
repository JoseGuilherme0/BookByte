'use client'

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import { IPost, IUser } from "@/interfaces";
import Link from "next/link";
import Post from "@/components/Post";
import { useSearchParams } from "next/navigation";

function Search() {

    const searchParams = useSearchParams();
    const params = searchParams.get("params");
    
    const users = useQuery({
        queryKey:["searchUsers", params],
        queryFn: ()=>
            makeRequest.get(`search/search-users?params=${params}`).then((res)=>{
                return res.data
            }),
            enabled: !!params
    })

    if(users.error){
        console.log(users.error)
    }

    const posts = useQuery({
        queryKey:["searchPosts", params],
        queryFn: ()=>
            makeRequest.get(`search/search-posts?params=${params}`).then((res)=>{
                return res.data
            }),
            enabled: !!params
    })

    if(posts.error){
        console.log(posts.error)
    }
    
    
    return ( 
        <div className=" w-[60%] flex gap-6">
            <div className=" flex flex-col gap-8 w-1/3 border-r p-4 items-center">
                <span className=" font-semibold text-lg">Usuários</span>
                {users.data?.map((user:IUser,id:number)=>{
                    return (
                        <div className="w-full bg-white rounded-lg p-4 shadow-md" key={id}>
                            <Link href={"/profile?id="+user.id} key={id} className="flex items-center gap-2">
                                <img src={
                                    user.userImg
                                        ? user.userImg
                                        : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                                }
                                alt="Imagem do perfil"
                                className="w-8 h-8 rounded-full"
                                />
                                <span className="font-bold">{user.username}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-8 w-1/2 p-4 items-center">
                <span className="font-semibold text-lg">Posts</span>
                {posts.data?.map((post:IPost, id:number)=>{
                    return(
                        <Post post={post} key={id}/>
                    )
                })}
            </div>
        </div>
     );
}

export default Search;