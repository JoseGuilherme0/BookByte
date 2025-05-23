"use client";

import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { makeRequest } from "../../../axios";

export default function MainHome({children}:{children:ReactNode} ) {

  const router = useRouter()

  const { data, error, isSuccess, isError} = useQuery({
    queryKey:["refresh"],
    queryFn: ()=>makeRequest.get("auth/refresh").then((res)=>{
      return res.data
    }),
    retry:false,
    refetchInterval: 60*50*1000,
  })

  if(isSuccess){
    console.log(data.msg)
  }

  if(isError){
    console.log(error)
    router.push('/login')
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-100"> 
      <Header/>
      <div className="w-full flex justify-start pt-10">
        <Sidebar/>
        <div className="w-full flex justify-center">
           {children}
        </div>
      </div>
    </main>
  );
}
