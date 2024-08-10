'use client'
import React, { useState, useEffect } from 'react';
import TableHydraClash from "../../components/tableHydraClash";
import HydraClashForm from "../../components/hydraClashForm";
import { title } from '../primitives';
import Navbar from '../../components/navbar';
import ModalCustom from "../../components/modal";
import { getAllTeams, getTeamsByClanAndDate, getclan } from '../../services/teamsService';
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { format } from 'date-fns';

export default function HydraClash() {
  const [openModal, setOpenModal] = useState(false);
  const [datas, setDatas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchClanResult, setSearchClanResult] = useState([]); // Renomeando para evitar conflito
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(-1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clan: '',
    date: '',
  });
  const [buscaClanDate, setBuscaClanDate] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Novo estado para o termo de busca

  const clansChoice = [
    { label: "Unholy", value: "Unholy" },
    { label: "Cursed", value: "Cursed" },
    { label: "Fallen", value: "Fallen" },
    { label: "Corrupted", value: "Corrupted" }
  ];

  const handleDetailsClick = (index) => {
    setIsOpen((prevIndex) => (prevIndex === index ? -1 : index));
  };



  useEffect(() => {
    async function findAllTeams() {
      try {
        const response = await getAllTeams();
        setTeams(response.data[0].teams);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    findAllTeams();
  }, []);



  useEffect(() => {
    async function searchClan() {
      try {
        const clanToSearch = formData.clan || searchQuery; // Usar formData.clan se estiver definido, caso contrário, use searchQuery
        if (clanToSearch.trim() === '') return; // Verificar se o campo de busca não está vazio

        const response = await getclan(clanToSearch);
        console.log("Data de início:", response.data);
        console.log("Data de término:", response.data['teams']);

        const newDataTeams = [];

        if (response.data && Array.isArray(response.data)) {
          response.data.forEach(obj => {
            if (obj.startDate && obj.endDate && Array.isArray(obj.teams)) {
              const startDateFormatted = format(new Date(obj.startDate), 'dd/MM/yyyy');
              const endDateFormatted = format(new Date(obj.endDate), 'dd/MM/yyyy');

              newDataTeams.push({
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                teams: obj.teams
              });
            }
          });
        }

        console.log(newDataTeams);
        setDataTeams(newDataTeams);
        setSearchClanResult(response.data); // Atualizando o estado correto

        console.log("RESULT CLAN SEARCH 2", response);
        console.log("RESULT CLAN ", clanToSearch);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    searchClan(); // Chamar a função de busca
  }, [formData.clan, searchQuery]);






  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setFormData(prevFormData => ({
      ...prevFormData,
      clan: '' // Defina o estado do campo de seleção como uma string vazia quando o usuário estiver buscando
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getclan(searchQuery); // Use searchQuery em vez de formData.clan
      console.log("enviado:", searchQuery);
      alert("sua resposta");

      // Limpar o campo de pesquisa após a submissão
      setSearchQuery('');
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
    }
  };



  return (
    <div className="bg-600 ">
      <Navbar />

      <div className='w-full '>
        <div>

          <div className='flex flex-col text-center my-10 '>
            <h1 className={title()}>Resultados&nbsp;</h1>
            <h1 className={title({ color: "violet", size: "md" })}> Hydra Clash&nbsp;</h1>
          </div>

          <div className='flex flex-row md:flex-col  gap-6 px-2 md:ml-10 md:justify-center  ' >
            
            <div className="flex flex-col items-center justify-start lg:flex-row w-full gap-6 px-2  ">
              <div className=' w-full flex align-center py-4 md:p-4  '>
                <select
                  name="clan"
                  value={formData.clan}
                  onChange={(e) => {
                    handleChange(e); // Chame o manipulador de eventos existente para atualizar o estado formData
                    setSearchQuery(''); // Limpe o campo de pesquisa quando uma opção for selecionada
                  }}
                  className='outline-none bg-zinc-800 px-4 rounded-xl'
                >
                  <option value="">Selecione o Clan</option>
                  <option value="Unholy">UNHOLY</option>
                  <option value="Cursed">CURSED</option>
                  <option value="Fallen">FALLEN</option>
                  <option value="Corrupted">CORRUPTED</option>
                </select>
              </div>

              <div className="flex flex-col items-center justify-start lg:flex-row w-full gap-6    ">

            
              <div className='flex flex-row w-full py-4 gap-2 justify-end items-start '>
                <div className='flex flex-row rounded-xl  text-xs p-1  md:px-2 bg-zinc-800 border border-zinc-800  '>
                  <input
                    type='search'
                    placeholder='Pesquise o clan pelo nome'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='bg-zinc-800 w-[250px] focus:outline-none'
                  />

                  <MagnifyingGlass size={20} className=' h-full' />
                </div>
                <button onClick={handleSubmit} className='w-full'>buscar</button>
              </div>
              </div>

              <div className='flex w-full md:align-center md:justify-end md:px-16 py-4 '>
                <ModalCustom title='Adicione os dados do hydra Clash' description='Novo Hydra Clash'>
                  <HydraClashForm />
                </ModalCustom>
              </div>
            </div>
          </div>


          <div >
            <div className='flex flex-col gap-4 my-10 mr-12 '>
              {dataTeams.map((dataTeam, index) => (
                <div key={index}>
                  <div onClick={() => handleDetailsClick(index)} className='flex w-full bg-zinc-900 justify-between align-center gap-20 p-4 pointer'>
                    <p className='xl:ml-16  '>{dataTeam.startDate} - {dataTeam.endDate}</p>
                    <button> <CaretDown size={16} /></button>
                  </div>
                  {isOpen === index && (
                    <div className="flex flex-row justify-around ">
                      <TableHydraClash teams={dataTeam.teams} />
                    </div>
                  )}
                </div>
              ))}


              {dataTeams.length === 0 && (
                <p className='text-center text-zinc-600'>Selecione o nome do clan ou faça uma busca para ver os resultados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
