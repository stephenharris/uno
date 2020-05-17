import {getRandomInt} from './random-integer';

export function getRandomCard() {
    let randomIndex = getRandomInt(0, 64);
    let suits = ['g', 'y', 'p', 'b'];
    let card = null;

    //0-51, 4 suits of 14
    if(randomIndex < 52) {
      let suit = suits[randomIndex%4];
      let value = Math.floor(randomIndex/4) + 1;
      card = suit + value;
    } else if (randomIndex < 57) {
      card = 'e'
    } else if (randomIndex < 62) {
      card = 'pi'
    } else if (randomIndex < 63) {
      card = 't'
    } else if (randomIndex < 64) {
      card = 'sk'
    }
    
    if(!card) {
      throw Error("Card index:" + randomIndex);
    }
    return card;
  }