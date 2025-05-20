'use client';

import AuthInput from "@/components/AuthInput";
import { useState } from "react";
import Link from "next/link";
import { makeRequest } from "../../../../axios";

function Register(){


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setErro] = useState('')

    const handleRegister = (e:any)=> {
        e.preventDefault()
        makeRequest.post("auth/register", {username, email, password, confirmPassword} ).then((res)=> {
            console.log(res.data)
            setErro('')
        }).catch((err)=> {
            console.log(err)
            setErro(err.response.data.msg)
        })
    }

    return(
        <>
            <h1 className="font-bold text-2xl text-green-600 text-center underline"> REGISTER </h1>
            <AuthInput label="Nome: " newState={setUsername}/>
            <AuthInput label="Email: " newState={setEmail}/>
            <AuthInput label="Senha: " newState={setPassword} IsPassword/>
            <AuthInput label="Confirmar a sua senha: " newState={setConfirmPassword} IsPassword/>
            {error.length>0 && <span className="text-red-600">* {error}</span>}
            <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-500" onClick={(e)=>handleRegister(e)} >
            Cadastrar-se
            </button>
            <Link href="/login" className="underline text-center">Login</Link>

        </>

    );
} 

export default Register;