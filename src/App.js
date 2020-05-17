import React, {useState} from 'react';
import './App.css';
import { GameState } from '../src/gameState';
import CreateGameScreen from "./screens/CreateGameScreen/CreateGameScreen";
import AwaitingPlayersScreen from './screens/AwaitingPlayersScreen/AwaitingPlayersScreen';
import Play from './screens/Play/Play';
import GameOver from './screens/GameOver/GameOver';
import axios from 'axios';

function App() {

  var exampleSocket = new WebSocket('wss://e8ttpjose2.execute-api.eu-west-2.amazonaws.com/testing/');

  const [gameState, setGameState] = useState(GameState.CREATE);
  const [game, setGame] = useState();
  const [gameId, setGameId] = useState(null);

  const emit = (action, payload) => {
    let msg = {action:action, payload:payload};
    exampleSocket.send(JSON.stringify(msg));
  }
  
  exampleSocket.onmessage = function (event) {
    console.log('-----------msgToClient-----------');
    const data = JSON.parse(event.data);
    console.log(data);
    setGame(data);
    setGameState(data.state);
  }

  const onJoinGame = (theGameId, playerName) => {
    
    setGameId(theGameId);

    localStorage.setItem('userId', playerName.toLowerCase());

    emit("JOIN_GAME", {
      "name": playerName,
      "id": localStorage.getItem('userId'), 
      "gameId": theGameId
    });
  }


  const onCreateGame = () => {
    axios.post(process.env.REACT_APP_REST_URL, {
      "game": "uno"
    }).then((response) => {
      console.log(response);
      window.location = '/game/' + response.data.id;
    });
  }


  const onStartGame = () => {
    emit("START_GAME", {
      gameId: gameId,
      playerId: localStorage.getItem('userId'),
    });
  }

  const onPlayCard = (card) => {
    emit("PLAY_CARD", {
      "card": card,
      "playerId": localStorage.getItem('userId'),
      "gameId": gameId
    });
  }

  const onPickUp = () => {
    emit("PICKUP_CARD", {
      "playerId": localStorage.getItem('userId'),
      "gameId": gameId
    });
  }


  return (
    <div className="wrapper">
      <h1 className="h1">Uno</h1>
      {gameState === GameState.CREATE && <CreateGameScreen onJoinGame={onJoinGame} onCreateGame={onCreateGame} />}
      {gameState === GameState.AWAITING_PLAYERS && <AwaitingPlayersScreen gameState={game} onStartGame={onStartGame}/>}
      {gameState === GameState.PLAY && <Play gameState={game} onPlayCard={onPlayCard} onPickUp={onPickUp} />}
      {gameState === GameState.GAME_OVER && <GameOver gameState={game}/>}
    </div>
  );
}


export default App;