'use client'
import React, {useState, useEffect} from 'react'
// import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';


export default function Details() {


  return (
    <div className="relative h-screen w-full flex items-center justify-center ">
    <Image className='' src={'https://img.freepik.com/fotos-premium/personagem-assustador-de-pessoa-posando-em-vestes-pretas_1007695-382.jpg'} layout="fill" objectFit="cover" alt='' />
    <div className="absolute inset-0 flex items-center justify-center">
        <div className=' bg-gray-950 backdrop-blur-xl  bg-opacity-10 p-8 flex align-center text-center'>
          <Link href='/players'>
          <p>GOAT KNIGHTS</p>
            <p>Players</p>
          </Link>
      </div>
     
    </div>   
  </div>
  )
}
