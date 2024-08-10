import React, { useEffect, useState } from "react";
import { editPlayer, deletePlayer,createPlayer } from '../../services/playersServices';
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function Form({ player, action,onSubmit ,onCloseModal}) {



  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    clan: "",
    chavesJogadas: "",
    hydraClash: "",
    mediaHydraClash: "",
    pontosCvc: "",
    status: "",
    detalhes: ""
  });


  const router = useRouter();

  useEffect(() => {
    if (player) {
      setFormData(player);
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const submitPlayer = async () => {
    try {
      if (action === "Add") {
        await createPlayer(formData);
        alert("Jogador adicionado com sucesso!");
        router.refresh()

      } else if (action === "Editar") {

        if (player && player._id) {
       
          // Se mediaHydraClash for vazio ou igual a 0, atribui o valor de hydraClash
          if ( player.mediaHydraClash === '0' || player.mediaHydraClash === "") {
            player.mediaHydraClash = hydraClash;
          }
          
          // Converte os valores de hydraClash e mediaHydraClash para números
          const hydraClashValue = formData.hydraClash ? parseFloat(formData.hydraClash.replace(' BILHÕES', '')) : 0;
          let mediaHydraClashValue = player.mediaHydraClash ? parseFloat(player.mediaHydraClash.replace(' BILHÕES', '')) : 0;
          console.log("Novo valor de hydraClashValue:", hydraClashValue);
          console.log("Novo valor de mediaHydraClashValue:", mediaHydraClashValue);
          
          // Calcula a nova média de mediaHydraClash
          const newMediaHydraClash = (mediaHydraClashValue + hydraClashValue) / 2;
          console.log("Novo valor de newMediaHydraClash:", newMediaHydraClash);
        
          // Atualiza o formData com a nova média
          formData.mediaHydraClash = `${newMediaHydraClash} BILHÕES`;
          console.log("Novo valor de mediaHydraClash:", formData.mediaHydraClash);
        
          // Edita o jogador com os dados atualizados
          await editPlayer(formData, player._id);
          console.log("Dados atualizados do jogador:", formData);
          alert("Jogador editado com sucesso!");
          router.refresh()
        } else {
          throw new Error("ID do jogador não está definido.");
        }
        
      }
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPlayer();
    await onSubmit(); 
  };





  return (
    <div className='max-w-sm bg-gray-950 p-4 border border-2-white rounded-md '  >
      <form onSubmit={handleSubmit} method="POST" className="flex flex-col max-w-[600px]  p-2 gap-4 justify-between rounded-md   ">
        <div className="w-full flex flex-row align-center justify-between  gap-2">
          <label className='text-white font-semibold '>NOME:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" className="outline-none bg-zinc-500 p-1 rounded-md ml-2"
          />
        </div>
        <div className="w-full flex flex-row align-center justify-between  ">
          <label className='text-white font-semibold'>TAG:</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md'
          />
        </div>
        <div className="w-full flex flex-row align-center justify-between ">
          <label className='text-white font-semibold'>CLAN:</label>
          <select
            name="clan"
            value={formData.clan}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md  w-[60%] '
          >
            <option value=""></option>
            <option value="Unholy">UNHOLY</option>
            <option value="Cursed">CURSED</option>
            <option value="Fallen">FALLEN</option>
            <option value="Corrupted">CORRUPTED</option>

          </select>
        </div>
        <div className='w-full flex flex-row align-center justify-between'>
          <label className='text-white font-semibold'>CHAVES JOGADAS:</label>
          <select
            name="chavesJogadas"
            value={formData.chavesJogadas}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md'
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className='w-full flex flex-row align-center justify-between gap-4'>
          <label className='text-white font-semibold'>HYDRA CLASH:</label>
          <input
            type="text"
            name="hydraClash"
            value={formData.hydraClash}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md   '
          />
        </div>
        {action === "Add" && (
          <div className='w-full flex flex-row align-center justify-between gap-4'>
            <label className='text-white font-semibold'>MEDIA HYDRA CLASH:</label>
            <input
              type="text"
              name="mediaHydraClash"
              value={formData.mediaHydraClash}
              onChange={handleChange}
              className='outline-none bg-zinc-500 p-1 rounded-md'
              
            />
          </div>
        )}
          
        <div className='w-full flex flex-row align-center justify-between'>
          <label className='text-white font-semibold'>PONTOS CVC:</label>
          <input
            type="text"
            name="pontosCvc"
            value={formData.pontosCvc}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md'
          />
        </div>
        <div className='w-full flex flex-row align-center justify-between'>
          <label className='text-white font-semibold'>STATUS:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md '
          >
            <option value=""></option>
            <option value="FICAR">FICAR</option>
            <option value="OBSERVACAO">OBSERVAÇÃO</option>
            <option value="DESCER">DESCER</option>
          </select>
        </div>
        <div className='w-full flex flex-row align-center justify-between'>
          <label className='text-white font-semibold'>DETALHES:</label>
          <textarea
            type="text"
            name="detalhes"
            value={formData.detalhes}
            onChange={handleChange}
            className='outline-none bg-zinc-500 p-1 rounded-md'
          />
        </div>
        <div className='w-full flex flex-row align-center justify-between gap-2 mt-2'>
          <div className='w-full'>
            <button
              type="submit"
              className='w-full flex align-center justify-center text-white text-semibold bg-cyan-700 shadow-lg p-2 rounded-md hover:bg-cyan-900 transition ease-in'>
              {action === "Add" ? "Adicionar" : "Editar"}
            </button>
          </div>
          <div className='w-full'>

              <button onClick={()=> onCloseModal()}
                className='flex w-full align-center justify-center text-white text-semibold p-2 rounded-md bg-cyan-900 shadow-lg  transition ease-in'>
                Cancelar
              </button>
          </div>
        </div>
       
      </form>
    </div>
  );
}
      