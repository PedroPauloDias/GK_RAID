'use client'
import React, { useEffect } from 'react'
import TablePlayers from '../../components/tablePlayers/index.jsx'
import { title } from '../primitives.jsx'
// import { signOut, useSession } from 'next-auth/react'
import { Button } from "@nextui-org/react";
import  Navbar from '../../components/navbar';
import useAuth from '../hooks/useAuth';

const PlayersPage = () => {

  const  {session}  = useAuth();
 console.log(session)

    return (
      <section className=" flex flex-col  ">
                    <Navbar />

        <div className=" text-center justify-center   p-2  ">
          <div className=" text-center justify-center   py-4">
              <h1 className={title({ color: "violet" , size:"md" })}>Players&nbsp;</h1>
          <h1 className={title()}>GK&nbsp;</h1>
          </div>
          <div className=''>
          <TablePlayers clan="Unholy"/>
          </div>
        </div>
      </section>
    );}
 

export default PlayersPage;
