import React from 'react';

async function fetchPlayer(playersId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${playersId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch player');
  }
  const player = await res.json();
  return player;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/players`);
  if (!res.ok) {
    throw new Error('Failed to fetch players');
  }
  const players = await res.json();

  return players.map((player) => ({
    playersId: player._id.toString(),
  }));
}

export default async function PlayerPageDetails({ params }) {
  let player;
  try {
    player = await fetchPlayer(params.playersId);
  } catch (error) {
    console.error('Error fetching player:', error);
    return (
      <div>
        <p>Erro ao carregar os dados do jogador.</p>
      </div>
    );
  }

  if (!player) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <p>USUÁRIO:</p>
      <p>{player.name}</p>
    </div>
  );
}
