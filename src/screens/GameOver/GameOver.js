import React from 'react';
import './GameOver.css';

function GameOver({gameState}) {

  const getWinner = () => {
    return gameState.players.find((player) => player.id === gameState.winner).name;
  }

  return (
    <div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>

      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>

      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>

      <p className="winnerBanner"><strong>{getWinner()}</strong> is the winner!</p>
    </div>
  );
}


export default GameOver;