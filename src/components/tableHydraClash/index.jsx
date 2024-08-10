import React, { useState, useEffect } from "react";
import { getAllPlayers } from '../../services/playersServices'
import { getAllTeams } from '../../services/teamsService';
import Image from "next/image";
import { CaretDown } from "phosphor-react";




const images = [
  'https://images.vexels.com/media/users/3/129154/isolated/preview/a9b2c4b91e649bf6c2b7de555015d668-medalha-de-laurel-em-1-lugar.png',
  'https://png.pngtree.com/png-clipart/20230811/original/pngtree-illustration-of-a-wreath-frame-with-2nd-place-silver-ranking-vector-picture-image_10350054.png',
 ' https://png.pngtree.com/png-clipart/20230811/original/pngtree-ranking-medal-icon-illustration-3rd-place-bronze-third-achievement-drawing-vector-picture-image_10346979.png',
  'https://png.pngtree.com/png-clipart/20230811/original/pngtree-ranking-medal-icon-illustration-4th-place-rounded-icons-drawing-web-design-vector-picture-image_10347101.png',
  'https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-ranking-medal-icon-illustration-5th-place-award-mark-achievement-vector-png-image_32573350.png'
];
export default function TableHydraClash({teams}) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  //const [teams, setTeams] = useState([]);
  const [date, setDate] = useState();
  

  
  const getImageForPosition = (position) => {
    if (position >= 1 && position <= 5) {
      // Subtrai 1 da posição porque os arrays em JavaScript são baseados em zero
      return images[position - 1];
    } else {
      // Se a posição estiver fora do intervalo, retorna uma imagem padrão ou null
      return null; 
    }
  };


  useEffect(() => {
    async function FindAllPlayers() {
      try {
        const response = await getAllPlayers();
        console.log("players :" , response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    FindAllPlayers();
  }, []);

  const handleDetailsClick = () => {
    setIsOpen(!isOpen);
  };



  return (
        <div className=' flex flex-col  '>
    <div className=' py-4 '>
          <tr className='flex w-full align-center gap-2 justify-between px-2 py-2 text-sm font-bold bg-zinc-950'>
            <th>POSIÇÃO</th>
            <th>NOME DO CLAN</th>
            <th>CHAVES JOGADAS</th>
            <th>PONTUAÇÃO</th>
          </tr>
        </div>
        
      <table aria-label="table hydra clash" className='w-full bg-zinc-950 '>
        <tbody> 
      {teams && teams.length > 0 && teams.map((team, index) => (
            <tr className='flex px-4 align-center justify-between bg-slate-900 my-2 p-2 rounded-lg ' key={index}>
              <td className='w-full '>
              <Image src={getImageForPosition(team.position)} alt={`Position ${team.position}` } width={70} height={70}/>
              </td>
                                      <td className='w-full ml-2 mt-6 '>{team.clanName}</td>
                                      <td className='w-full text-center pr-5 mt-6'>{team.keysPlayed}</td>
                                      <td className='w-full text-end pr-2 mt-6'>{team.score} BILHÕES</td>
                                    </tr>
        
      ))}
        </tbody>

      </table>
      </div>
  );
}
