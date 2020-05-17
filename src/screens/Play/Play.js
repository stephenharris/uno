import React, {useState, useEffect} from 'react';
import Button from '../../components/Button/Button'
import './Play.css';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import cn from "classnames";
import { TransitionGroup, CSSTransition } from 'react-transition-group' // ES6
import Modal from '../../components/Modal/Modal';
import {RadioInput, RadioGroup} from '../../components/RadioInput/RadioInput';

function Play({gameState, onPlayCard, onPickUp}) {

  const [selected, setSelected] = useState('');
  const [chosenColour, setChosenColour] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loadingPickUp, setLoadingPickUp] = useState(false);
  const [loadingPlayCard, setLoadingPlayCard] = useState(false);

  useEffect(() => {
    setLoadingPickUp(false);
    setLoadingPlayCard(false);
    setSelected("");
    setChosenColour("");
  }, [gameState]);

  const pickUp = (e) => {
    setLoadingPickUp(true);
    e.preventDefault();
    onPickUp()
  }

  const cardsMatch = (card1, card2) => {
    const [number1, colour1] = card1.toLowerCase().split("");
    const [number2, colour2] = card2.toLowerCase().split("");
    return (colour1 === colour2 || colour1 === "?" || colour2 === "?" || number1 === number2);
  }

  const playSelectedCard = () => {
    setShowModal(false);

    if(!selected) {
      setChosenColour("");
      return;
    }

    if (!cardsMatch(selected, gameState.discardPile[0])) {
      setChosenColour("");
      return;
    }

    const [number, colour] = selected.toLowerCase().split("");

    if (colour === '?' && !chosenColour) {
      setShowModal(true);

    }else if (colour === '?' && chosenColour) {
      let card = selected.replace(/([?*])([?])(\d)/i, `$1${chosenColour}$3`) 
      setShowModal(false);
      setLoadingPlayCard(true);
      onPlayCard(card);
    } else {
      onPlayCard(selected);
      setLoadingPlayCard(true);
    }

    setChosenColour("");
  }

  const selectCard = (card) => {
    if(card === selected) {
      setSelected("");
    } else {
      setSelected(card);
    }
  }

  const rot = 360 / gameState.players.length;

  return (
    <div>
      <div className="wrap">
        <div className="deck">
            <Card 
              interactive={false}
              type={gameState.discardPile[0]}
              />
        </div>
        <div className="playersWrap">
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn({
            'directions': true,
            'directions--reversed': gameState.direction === -1,
          })}>
            <circle cx="12" cy="12" r="10" fill="none"></circle>
            <path d="M8.52 7.11a5.98 5.98 0 0 1 8.98 2.5 1 1 0 1 1-1.83.8 4 4 0 0 0-5.7-1.86l.74.74A1 1 0 0 1 10 11H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1.7-.7l.82.81zm5.51 8.34l-.74-.74A1 1 0 0 1 14 13h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1.7.7l-.82-.81A5.98 5.98 0 0 1 6.5 14.4a1 1 0 1 1 1.83-.8 4 4 0 0 0 5.7 1.85z"></path>
          </svg>
          
          <ul className="players">
            {gameState.players.map((player, index) => {
              let angle = rot * parseInt((index),10) - rot * gameState.playerCounter;
              return (<li 
                key={index} 
                className={cn({
                  'players__player': true,
                  'players__player--currentPlayer': player.id === gameState.thisPlayer
                })}
                style={{transform: `rotate(${angle}deg) translateY(-100px) rotate(${-1*angle}deg)`}}>
                  {player.name} ({gameState.cardsInHand[player.id]})
                </li>);
            })}
          </ul>
        </div>
      </div>
            
      <div className="hand">
          <TransitionGroup classNames="card-animation" component={null}>
          {gameState.cardsInPlayersHand && gameState.cardsInPlayersHand.map((card, i) => {
            return (
            <CSSTransition
              key={i}
              classNames="card-animation"
              timeout={{ enter: 500, exit: 300 }}
            >
              <Card 
                interactive={gameState.players[gameState.playersTurn].id === gameState.thisPlayer}
                selected={card === selected}
                type={card} 
                onClick={() => selectCard(card)}/>
            </CSSTransition>
            ) 
          })}
          </TransitionGroup>
        </div>

        <div className="cardActions">
          <div className="buttonWrap">
            <Button disabled={gameState.players[gameState.playersTurn].id !== gameState.thisPlayer || selected || loadingPickUp}  onClick={pickUp}>Pick up</Button>
            <Loading visible={loadingPickUp}/>
          </div>
          <div className="buttonWrap">
            <Button disabled={gameState.players[gameState.playersTurn].id !== gameState.thisPlayer || !selected || loadingPlayCard} onClick={playSelectedCard}>Play card</Button>
            <Loading visible={loadingPlayCard}/>
          </div>
        </div>

        <Modal onClose={() => setShowModal(false)} isVisible={showModal}>
          <>
            <p>Select a colour to play:</p>
            <RadioGroup name="radio-example">
              <RadioInput onSelect={(evt)=>setChosenColour(evt.target.value)} color="blue" value="b" label="Blue" checked={chosenColour === "b"}/>
              <RadioInput onSelect={(evt)=>setChosenColour(evt.target.value)} color="green" value="g" label="Green" checked={chosenColour === "g"}/>
              <RadioInput onSelect={(evt)=>setChosenColour(evt.target.value)} color="red" value="r" label="Red" checked={chosenColour === "r"}/>
              <RadioInput onSelect={(evt)=>setChosenColour(evt.target.value)} color="yellow" value="y" label="Yellow" checked={chosenColour === "y"}/>
            </RadioGroup>

            <Button disabled={!chosenColour} onClick={playSelectedCard}>Play card</Button>
          </>
        </Modal>
      </div>
  );
}


export default Play;