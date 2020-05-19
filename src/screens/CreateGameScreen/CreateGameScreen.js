import React, {useState, useEffect} from 'react';
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import './CreateGameScreen.css';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';

function CreateGameScreen({onJoinGame, onCreateGame}) {
  const [gameId, setGameId] = useState('');
  const [playerName, setName] = useState('');
  const [joinGame, setJoinGame] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    let match = window.location.pathname.match(/\/([a-zA-Z0-9]+)\/?/);

    if (match && match[1]) {
      setGameId(match[1]);
      setJoinGame(true);
    }
  }, [])
  
  const onClickJoinGame = (e) => {
    if (!playerName || !gameId) {
      return;
    }
    e.preventDefault();
    setLoading(true);
    onJoinGame(gameId, playerName);
  }

  const onClickCreateGame = (e) => {
    e.preventDefault();
    setLoading(true);
    onCreateGame();
  }

  return (
    <>
      <div className="login">

        {joinGame && <>
          <TextInput label="Your name" value={playerName} onChange={(e) => setName(e.target.value)}/>
        
          <TextInput label="Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)}/>

          <div className="buttonWrap">
            <Button disabled={loading} onClick={onClickJoinGame}>Join Game {loading && <span>{loading}</span>}</Button>
            <Loading visible={loading}/>
          </div>
        </>}
        
        {!joinGame && 
          <div className="buttonWrap">
            <Button disabled={loading} onClick={onClickCreateGame}>Create new game</Button>
            <Loading visible={loading}/>
          </div>
        }
      </div>

      <div className="exampleCards">
        <Card type="+b0"></Card>
        <Card type="*?1"></Card>
        <Card type="cg0"></Card>
        <Card type="??3"></Card>
        <Card type="xy1"></Card>
        <Card type="4r0"></Card>
      </div>
    </>
  );
}


export default CreateGameScreen;