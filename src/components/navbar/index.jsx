'use client'
import Link from 'next/link'
// import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ThemeSwitch } from '../theme-switch'
import Logout from '../../components/Logout'

export default function Navbar() {

  return (
    <>
      <div className=' w-full  flex justify-between gap-4  text-sm  
              '>
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
         <Logout/>
        </div>

      </div>

    </>
  )

}