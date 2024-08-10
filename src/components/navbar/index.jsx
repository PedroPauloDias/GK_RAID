'use client'
import Link from 'next/link'
// import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ThemeSwitch } from '../theme-switch'

export default function Navbar() {

  return (
    <>
      <div className='w-full flex gap-4 p-2  text-white text-sm  text-center align-center 
    justify-between  bg-zinc-600 backdrop-blur-3xl  bg-opacity-30'>
        <div className=''>GK</div>
        <Link className=' hover:border-b-1 hover:border-zinc-200' href='/'>
          <p>Home</p>
        </Link>
        <Link className=' hover:border-b-1 hover:border-zinc-200' href='/players'>
          <p>Players</p>
        </Link>
        <Link className=' hover:border-b-1 hover:border-zinc-200' href='/hydraclash'>
          <p>Hydra Clash</p>
        </Link>
        <div>
          <ThemeSwitch />
        </div>

        <div className='flex gap-4 text-center text-sm ' >
          <div className='flex gap-2'>
            <Image className='rounded-lg' src='https://img.freepik.com/vetores-premium/logotipo-da-cabeca-de-bode_43623-304.jpg ' width='20' height='15' />
            {/* <p>{session?.user?.name}</p> */}
          </div>
          <button onClick={() => signOut()} className='bg-zinc-700 text-xs text-white  rounded text-center px-1 ' >
            sair
          </button>
        </div>
      </div>

    </>
  )

}