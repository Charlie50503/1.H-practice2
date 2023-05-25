import { Card } from '../card';
import { HandExchange } from '../handExchange';
import { Hand } from '../hand/hand';

export enum PlayerType {
  AI,
  HUMAN,
}

export abstract class Player {
  abstract type: PlayerType.AI | PlayerType.HUMAN;
  name!: string;
  hand: Hand;

  isExchangedHands: boolean;

  point: number;

  handExchange!: HandExchange;

  playerId: number;

  constructor(name: string, hand: Hand, playerId: number) {
    this.isExchangedHands = false;
    this.point = 0;
    this.nameHimself(name);
    this.hand = hand;
    this.playerId = playerId;
    this.handExchange = new HandExchange(3, this);
  }

  public nameHimself(name: string) {
    this.name = name;
  }

  public doExchangeHands(exchangee: Player) {
    console.log(
      '玩家編號: ',
      this.playerId,
      '玩家名稱: ' + this.name + '選擇與玩家編號「 ',
      exchangee.playerId,
      '」交換手牌!'
    );

    this.isExchangedHands = true;
    this.handExchange.setIsExchanging(true);
    this.handExchange.setExchangee(exchangee);
    this.handExchange.exchange();
  }

  public doExchangeHandsBack() {
    this.handExchange.switchHandsBack();
    this.handExchange.setIsExchanging(false);
  }

  public abstract chooseToExchangeHands(): Promise<boolean>;
  public abstract chooseExchangee(players: Player[]): Promise<Player>;
  public abstract showCard(): Promise<Card | null>;
}
