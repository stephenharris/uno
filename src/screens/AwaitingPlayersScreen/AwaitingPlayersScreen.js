import React, {useState} from 'react';
import Button from '../../components/Button/Button'
import './AwaitingPlayersScreen.css';
import cn from 'classnames';

function AwaitingPlayersScreen({gameState, onStartGame}) {

  const onClickStartGame = (e) => {
    e.preventDefault();
    setLoading(true);
    onStartGame();
  }

  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h2 className="h2">Awaiting players</h2>
      <div className="awaitingPlayerList">
        <ul>
          {gameState.players && gameState.players.map((player) => {
            return (<li 
              key={player.id}
              className={cn({
                "awaitingPlayerList__player": true,
                "awaitingPlayerList__player--currentPlayer": player.id === gameState.thisPlayer
              })}
              >{player.name}</li>) 
          })}
        </ul>

        <Button disabled={loading} onClick={onClickStartGame}>Start game!</Button>
      </div>
    </div>
  );
}


export default AwaitingPlayersScreen;