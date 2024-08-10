'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Input , Button} from "@nextui-org/react";
import Link from 'next/link'

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const resUserExist = await fetch("/api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExist.json();
      if (user) {
      setError("usuario ja existe")
      }
     
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      if (res.status === 201) {
        const form = e.target;
        form.reset();
        router.push('/login')
 
      } else {
        setError("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("An error occurred while registering the user.");
    }
  };
  
  return (
    <div className=' h-full py-2 rounded-md flex flex-col mt-4  items-center'>
      <h2 className='text-xl text-white text-center pb-4 flex gap-2'>Faça seu cadastro</h2>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4  bg-opacity-10  '  >
      <Input
      
      type="Text"
      label="name"
      variant="bordered"      
      className="max-w-xs text-white" 
      onChange={(e) => setName(e.target.value)} />
      <Input
      
      type="Email"
      label="Email"
      variant="bordered"      
      className="max-w-xs text-white" 
      onChange={(e) => setEmail(e.target.value)} />

            <Input      
      type="Password"
      label="Senha"
      variant="bordered"      
      className="max-w-xs text-white" onChange={(e) => setPassword(e.target.value)} />
        <div>
        <Button type="submit"
        radius="md" className="w-[250px]   bg-gradient-to-br from-red-900 to-zinc-600 text-white shadow-lg my-2"
            >Cadastrar</Button>
        </div>
        {
          error &&
          <div >{error}</div>
        }
      </form>
      <div className=' flex gap-2 text-zinc-500 my-2'>
        <p>já tem cadastro?</p>
        <Link href='/login'>
        <p className=' text-zinc-400'>Login</p>
          </Link>
      </div>
    </div>
  );
}
