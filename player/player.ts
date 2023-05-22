import { ShowdownGame } from './../showdownGame';
import { Hand } from '../hand';
import { PlayAction } from '../playAction/playAction';
import { ExchangeHand } from './exchangeHands';
import { Card } from '../card';

export class Player {
  name!: string;
  playAction: PlayAction;
  hand!: Hand;

  isExchangedHards: boolean;

  point: number;

  exchangeHand!: ExchangeHand;

  showdownGame:ShowdownGame;

  constructor(name:string,playAction: PlayAction,showdownGame:ShowdownGame) {
    this.playAction = playAction;
    // this.hand = hand;
    this.isExchangedHards = false;
    this.point = 0;
    this.showdownGame = showdownGame;
    this.nameHimself(name);
  }

  setHand(cards: Card[]){
    this.hand = new Hand(cards);
  }

  nameHimself(name: string) {
    this.name = name;
  }

  takeTurn() {
    this.showdownGame.nextRoundIndex();
  }

  doExchangeHands(exchangee: Player) {
    this.exchangeHand = new ExchangeHand(this, exchangee);
    // this.exchangeHand.counterDown;
  }
}
