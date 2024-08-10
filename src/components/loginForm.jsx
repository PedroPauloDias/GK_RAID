'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Input, Button } from "@nextui-org/react";
import Link from 'next/link'
import { doCredentialLogin } from '../app/actions';
import { toast, Toaster } from 'react-hot-toast';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const router = useRouter()

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      console.log("FORMDATA", formData);

      const response = await doCredentialLogin(formData);

      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/Details");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  async function handleVisitorLogin() {
    const formData = new FormData();
    formData.append("email", "visitante@example.com");
    formData.append("password", "visitante123");

    toast.promise(
      doCredentialLogin(formData),
      {
        loading: 'Login...',
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      },
      {
        duration: 6000,
      }
    ).then(response => {
      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        setTimeout(() => {
          router.push("/Details");
        }, 3000);
      }
    }).catch(err => {
      console.error(err);
    });
  }


  return (
    <>
      <Toaster toastOptions={{ duration: 5000, }}
      />
      <div className=' h-full py-2 rounded-md flex flex-col mt-4  items-center'>
        <h2 className='text-xl text-white text-center pb-4 flex gap-2'>Faça seu Login</h2>
        <form                     onSubmit={onSubmit}     className=' flex flex-col gap-4  bg-opacity-10  '  >
          <Input

           type="email" label="Email" name="email" id="email"
            variant="bordered"
            className="max-w-xs text-white"
            onChange={(e) => setEmail(e.target.value)} />

          <Input
            type="password" label="Senha" name="password" id="password"
            variant="bordered"
            className="max-w-xs text-white" onChange={(e) => setPassword(e.target.value)} />
          <div>
            <Button type="submit"
              radius="md" className="w-[250px]   bg-gradient-to-br from-red-900 to-zinc-600 text-white shadow-lg my-2"
            >Login</Button>
          </div>
          <div>--------------</div>
          <div className=" w-full flex flex-col  ">
            <button className=' p-2 rounded-xl bg-gradient-to-br from-red-900 to-zinc-500 text-white ' type='submit' onClick={handleVisitorLogin} color='radani2'>Visitante</button>
          </div  >
          {
            error &&
            <div >{error}</div>
          }
        </form>

        <div className=' flex gap-2 text-zinc-500 my-2'>
          <p>nao tem cadastro?</p>
          <Link href='/register'>
            <p className=' text-zinc-500'>Registre-se</p>
          </Link>
        </div>

      </div>
    </>

  )
}

