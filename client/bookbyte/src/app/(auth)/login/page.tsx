"use client";

import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import { useContext, useState } from "react";
import { makeRequest } from "../../../../axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErro] = useState("");
  const {setUser} = useContext(UserContext)

  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault();
    makeRequest
      .post("auth/login", { email, password })
      .then((res) => {
        localStorage.setItem(
          "bookbyte:user",
          JSON.stringify(res.data.user)
        );
        setUser(res.data.user);
        setErro("");
        router.push('/main')
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        setErro(err.response.data.msg);
      });
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-green-600 text-center underline">
        LOGIN
      </h1>
      <AuthInput label="Email: " newState={setEmail} />
      <AuthInput label="Password: " newState={setPassword} IsPassword />
      {error.length > 0 && <span className="text-red-600">* {error}</span>}
      <button
        className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-500"
        onClick={(e) => handleLogin(e)}
      >
        ENTRAR
      </button>

      <Link href="/register" className="underline text-center">
        Cadastrar-se
      </Link>
    </>
  );
}

export default Login;
