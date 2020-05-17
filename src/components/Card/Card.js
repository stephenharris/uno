import React from 'react';
import cn from 'classnames';
import './Card.css';

function Card({type, interactive, onClick, selected}) {

  const [number, colour] = type.split("");

  const colourClassMap = {
    "y": "yellow",
    "b": "blue",
    "g": "green",
    "r": "red",
    "?": "black"
  }

  const numberClassMap = {
    "?": "change-colour",
    "x": "miss-a-go",
    "*": "plus-4",
    "+": "plus-2",
    "c": "change-direction",
  }

  const labelMap = {
    "+": "2",
    "*": "4",
    "c": "↺",
    "x": "⊖"
  }

  const colourName = colourClassMap[colour.toLowerCase()];
  const numberClass = numberClassMap[number] ? numberClassMap[number] : number;
  const label = labelMap[number] ? labelMap[number] : number.toUpperCase();

  return (
    <button className="cardWrap" disabled={!interactive} onClick={onClick}>
      <div className={cn({
      'Card': true,
      'Card--interactive': interactive,
      ['Card--' + colourName]: true,
      ['Card--num-' + numberClass]: true,
      'Card--selected': selected
    })}>
      <div className="inner">
        <div className="mark">{label}</div>
      </div>
      </div>
    </button>
  );
}

export default Card;