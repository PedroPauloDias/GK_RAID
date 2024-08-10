'use client'
import Link from 'next/link'
// import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ThemeSwitch } from '../theme-switch'

export default function Navbar() {

  return (
    <>
      <div className='w-full max-w-3xl flex gap-2 p-2 text-sm  text-center align-center 
           justify-between   backdrop-blur-3xl  bg-opacity-30   '>
          <div className=''>GK</div>
        <Link className=' hover:border-b-1 hover:border-zinc-200 ' href='/'>
          <p>Home</p>
        </Link>
        <Link className=' hover:border-b-1 hover:border-zinc-200' href='/players'>
          <p>Players</p>
        </Link>
        <Link className=' hover:border-b-1 hover:border-zinc-200' href='/hydraclash'>
          <p>Hydra Clash</p>
        </Link>
        <div className='flex flex-row gap-4 text-center items-center justify-center text-sm ' >
          <ThemeSwitch />
          <Image className='rounded-full' src='https://img.freepik.com/vetores-premium/logotipo-da-cabeca-de-bode_43623-304.jpg ' width='30' height='20' />
          {/* <p>{session?.user?.name}</p> */}
          <button onClick={() => signOut()} className='flex text-sm rounded text-center justify-center ' >
            sair
          </button>
        </div>

      </div>

    </>
  )

}