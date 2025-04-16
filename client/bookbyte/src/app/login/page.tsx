"use client";

import AuthInput from '@/components/AuthInput';
import AuthPage from '@/components/AuthPage';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/auth/login", { email, password }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

    return(
        <AuthPage> 
                <h1 className="font-bold text-2xl text-green-600 text-center underline">LOGIN</h1>
                <AuthInput label="Email: " newState={setEmail} /> 
                <AuthInput label="Password: " newState={setPassword} IsPassword />
                <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-500" onClick={(e)=>handleLogin(e)} >
                ENTRAR
                </button>

                <Link href="/register" className="underline text-center">Cadastrar-se</Link>
         </AuthPage>
    );
    
}

export default Login;