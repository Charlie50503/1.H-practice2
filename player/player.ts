import { ShowdownGame } from './../showdownGame';
import { Hand } from '../hand/hand';
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

  showdownGame: ShowdownGame;

  playerId: number;

  constructor(
    name: string,
    playAction: PlayAction,
    showdownGame: ShowdownGame,
    hand: Hand,
    playerId: number
  ) {
    this.playAction = playAction;
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
