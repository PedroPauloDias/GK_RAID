'use client'
import React, { useEffect } from 'react'
import TablePlayers from '../../components/tablePlayers/index.jsx'
import { title } from './../primitives'
// import { signOut, useSession } from 'next-auth/react'
import { Button } from "@nextui-org/react";
// import Navbar from '../../components/navbar';


const PlayersPage = () => {
    return (
      <section className="flex flex-col items-center justify-center  gap-4  md:py-0">
       {/* <Navbar /> */}
        <div className=" text-center justify-center   p-2">
          <div className=" text-center justify-center   p-4">
              <h1 className={title({ color: "red" , size:"sm" })}>Players&nbsp;</h1>
          <h1 className={title()}>GK&nbsp;</h1>
          </div>
          <TablePlayers clan="Unholy"/>
        </div>
      </section>
    );}
 

export default PlayersPage;
