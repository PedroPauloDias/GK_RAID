import React, { useState } from "react";
import { DateInput } from "@nextui-org/react";
import { Calendar } from "phosphor-react";
import ButtonCustom from "../../components/inputs/button"
import SelectCustom from "../../components/inputs/select"
import InputCustom from "../../components/inputs/input"
import { createHydraClash} from '../../services/teamsService';

export default function TeamForm() {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    teams: [],
  });
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a visibilidade do modal

  const chavesJogadas = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ];
  
  const posicoes = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ];

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const teams = [...formData.teams];
    teams[index][name] = value;
    setFormData({ ...formData, teams });
    console.log("FORM DE ENVIO AO BD", formData)
  };
  const dateString = "2024-05-14"; // Exemplo de string de data
  const dateObject = new Date(dateString); // Convertendo para um objeto Date
  
  
  const isStartDateValid = formData.startDate instanceof Date && !isNaN(formData.startDate.valueOf());
  const isEndDateValid = formData.endDate instanceof Date && !isNaN(formData.endDate.valueOf());

  console.log("DATES", isStartDateValid, isEndDateValid)
  console.log("DATES FORM", formData)

  const addTeam = () => {
    setFormData({
      ...formData,
      teams: [...formData.teams, { clan: "", position: "", keysPlayed: "", score: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    
  const formattedStartDate = formData.startDate.toISOString();
  const formattedEndDate = formData.endDate.toISOString();

  const dataToSend = {
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    teams: formData.teams
  };

    if (!isStartDateValid || !isEndDateValid) {
      alert("Por favor, insira datas válidas para startDate e endDate!");
      return;
    }

    if (formData.teams.length !== 5) {
      alert("Você precisa adicionar as 5 equipes antes de enviar o formulário!");
      return;
    }

    console.log("FormDataPARAObD:", dataToSend); 
    try {
      const response = await createHydraClash(dataToSend);
  
      if (response.status === 201) {
        alert("Hydra Clash adicionado com sucesso!");
        console.log("Data sent successfully!");
        setOpenModal(false); // Fechar o modal após o envio bem-sucedido
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full flex-col ">
        <div className="flex w-full align-center justify-center flex-wrap md:flex-nowrap md:mb-0 gap-4">
        <input
  type='date'
  value={formData.startDate.toISOString().split('T')[0]}
  name='startDate'
  onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
/>

<input
  type='date'
  value={formData.endDate.toISOString().split('T')[0]}
  name='endDate'
  onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
/>


        </div>
      </div>
      <br />
  
      {formData.teams.map((team, index) => (
        <div key={index} className='flex flex-col gap-4 w-full my-2 '>
          <p>{index +1}ª Equipe :</p>
          <label className='flex flex-row gap-2 '>           
            <InputCustom
              type="text"
              title="Nome do clan"
              value={team.clanName}
              onChange={(newValue) => handleInputChange({ target: { name: 'clanName', value: newValue } }, index)}
            />
          </label>
          <label className='flex flex-row '>
            <SelectCustom
              type="number"
              name="position"
              value={team.position}
              title='Posição'
              variant='flat'
              items={posicoes}
              onChange={(newValue) => handleInputChange({ target: { name: 'position', value: newValue } }, index)}
            />
          </label>
          <label className='flex flex-row '>
            <InputCustom
              type="number"
              name="keysPlayed"
              value={team.keysPlayed}
              title='Chaves jogadas'
              variant='flat'
              items={chavesJogadas}
              onChange={(newValue) => handleInputChange({ target: { name: 'keysPlayed', value: newValue } }, index)}
            />
          </label>
          <label className='flex flex-row gap-2'>
            <InputCustom
              type="text"
              name="score"
              title="Pontuação"
              value={team.score}
              onChange={(newValue) => handleInputChange({ target: { name: 'score', value: newValue } }, index)}
            />
          </label>
          <div>
            <div className='w-full bg-zinc-500 h-[1px]'></div>
          </div>
        </div>
      ))}
      <div className='flex flex-row align-center justify-center gap-4 m-4'>
        <button className=' bg-zinc-700 p-2  px-4 rounded-xl text-sm' type="button" onClick={addTeam} disabled={formData.teams.length >= 5}>
          Adicionar Equipe
        </button>
        <br />
        <button size='2xl' type="submit">Cadastrar todos</button>
      </div>
    <p className='w-full text-center text-zinc-500 '>*obs: Adicionar as 5 equipes antes de cadastrar</p>
    </form>
  );
}
