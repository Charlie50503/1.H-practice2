import { Card } from '../card';
import { ExchangeHands } from '../exchangeHands';
import { Hand } from '../hand/hand';
import rl from '../utils/readline';

export enum PlayerType {
  AI,
  HUMAN,
}

export abstract class Player {
  abstract type: PlayerType.AI | PlayerType.HUMAN;
  name!: string;
  hand: Hand;

  isExchangedHards: boolean;

  point: number;

  exchangeHands!: ExchangeHands;

  playerId: number;

  constructor(name: string, hand: Hand, playerId: number) {
    this.isExchangedHards = false;
    this.point = 0;
    this.nameHimself(name);
    this.hand = hand;
    this.playerId = playerId;
    this.exchangeHands = new ExchangeHands(3, this);
  }

  nameHimself(name: string) {
    this.name = name;
  }

  doExchangeHands(exchangee: Player) {
    this.isExchangedHards = true;
    this.exchangeHands.setExchangee(exchangee);
    this.exchangeHands.exchange();
  }

  abstract choiceDoExchangeHands(): Promise<boolean>;
  abstract choiceExchangee(players: Player[]): Promise<Player>;
  abstract showCard(): Promise<Card | null>;
}
