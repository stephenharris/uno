import React, {useState} from 'react';
import Button from '../../components/Button/Button'
import './AwaitingPlayersScreen.css';
import cn from 'classnames';
import ClickToCopy from '../../components/ClickToCopy/ClickToCopy';

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
        <h3>Share the link</h3>
        <p>Other players can join using the link below</p>
        <p class="shareUrl">
          {`${process.env.REACT_APP_URL}/${gameState.id}`}
          <ClickToCopy textToCopy={`${process.env.REACT_APP_URL}/${gameState.id}`}>
            <svg className="clickToCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <rect className="clickToCopy__primary" width="14" height="14" x="3" y="3" rx="2"></rect>
              <rect className="clickToCopy__secondary" width="14" height="14" x="7" y="7" rx="2"></rect>
            </svg>
          </ClickToCopy>
        </p>

        <h3>Players in game</h3>
        <ol>
          {gameState.players && gameState.players.map((player) => {
            return (<li 
              key={player.id}
              className={cn({
                "awaitingPlayerList__player": true,
                "awaitingPlayerList__player--currentPlayer": player.id === gameState.thisPlayer
              })}
              >{player.name}</li>) 
          })}
        </ol>



        <h3>Start the game</h3>
        <p>Once everyone has joined, start the game</p>
        <Button disabled={loading} onClick={onClickStartGame}>Start game!</Button>
      </div>
    </div>
  );
}


export default AwaitingPlayersScreen;