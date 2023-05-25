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

  public nameHimself(name: string) {
    this.name = name;
  }

  public doExchangeHands(exchangee: Player) {
    console.log(`玩家編號: ${this.playerId},玩家名稱: ${this.name} 選擇與玩家編號「 ${exchangee.playerId}」交換手牌!`);
    
    this.isExchangedHards = true;
    this.exchangeHands.setIsExchanging(true);
    this.exchangeHands.setExchangee(exchangee);
    this.exchangeHands.exchange();
  }

  public doExchangeHandsBack(){
    this.exchangeHands.switchHandsBack();
    this.exchangeHands.setIsExchanging(false)
  }

  public abstract choiceDoExchangeHands(): Promise<boolean>;
  public abstract choiceExchangee(players: Player[]): Promise<Player>;
  public abstract showCard(): Promise<Card | null>;
}
