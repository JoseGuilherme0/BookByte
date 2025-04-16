'use client';

import AuthInput from "@/components/AuthInput";
import AuthPage from "@/components/AuthPage";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

function Register(){


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = (e:any)=> {
        e.preventDefault()
        axios.post("http://localhost:8001/api/auth/register", {username, email, password, confirmPassword} ).then((res)=> 
            {console.log(res.data)}).catch((err)=> {console.log(err)})
    }

    return(
        <AuthPage>
            <h1 className="font-bold text-2xl text-green-600 text-center underline"> REGISTER </h1>
            <AuthInput label="Nome: " newState={setUsername}/>
            <AuthInput label="Email: " newState={setEmail}/>
            <AuthInput label="Senha: " newState={setPassword} IsPassword/>
            <AuthInput label="Confirmar a sua senha: " newState={setConfirmPassword} IsPassword/>

            <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-500" onClick={(e)=>handleRegister(e)} >
            Cadastrar-se
            </button>
            <Link href="/login" className="underline text-center">Login</Link>

        </AuthPage>

    );
} 

export default Register;