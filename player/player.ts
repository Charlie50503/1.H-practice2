import { ShowdownGame } from './../showdownGame';
import { Hand } from '../hand/hand';
import { ExchangeHand } from './exchangeHands';
import { Card } from '../card';

export class Player {
  name!: string;
  hand!: Hand;

  isExchangedHards: boolean;

  point: number;

  exchangeHand!: ExchangeHand;

  showdownGame: ShowdownGame;

  playerId: number;

  constructor(
    name: string,
    showdownGame: ShowdownGame,
    hand: Hand,
    playerId: number
  ) {
    this.isExchangedHards = false;
    this.point = 0;
    this.showdownGame = showdownGame;
    this.nameHimself(name);
    this.hand = hand;
    this.playerId = playerId;
  }

  nameHimself(name: string) {
    this.name = name;
  }

  doExchangeHands(exchangee: Player) {
    this.exchangeHand = new ExchangeHand(this, exchangee);
    // this.exchangeHand.counterDown;
  }
}
