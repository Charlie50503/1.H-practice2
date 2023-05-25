import { Card } from '../card';
import { Hand } from '../hand/hand';
import rl from '../utils/readline';
import { Player, PlayerType } from './player';

export class Human extends Player {
  type = PlayerType.HUMAN;
  constructor(name: string, playerId: number) {
    const hand = new Hand();
    super(name, hand, playerId);
  }

  public choiceExchangee(players: Player[]): Promise<Player> {
    return new Promise((resolve, reject) => {
      rl.question(`請輸入要被交換的玩家編號 : `, (id: string) => {
        if (isNaN(Number(id))) {
          return reject('無效輸入');
        } else if (Number(id) === this.playerId) {
          return reject('不能輸入自己的編號');
        }
        const exchangee = players.find(
          (player) => player.playerId === Number(id)
        );
        if (!exchangee) {
          return reject('沒找到對應玩家');
        }
        return resolve(exchangee);
      });
    });
  }

  public choiceDoExchangeHands(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      rl.question(`是否要交換手牌 是:Y/否:N : `, (answer: string) => {
        if (answer === 'Y') {
          return resolve(true);
        } else if (answer === 'N') {
          return resolve(false);
        }
        return reject('無效輸入');
      });
    });
  }

  public showCard(): Promise<Card | null> {
    this.hand.viewCards();
    return new Promise((resolve, reject) => {
      if (this.hand.cards.length === 0) {
        resolve(null);
      }
      rl.question(`請選擇要出的牌 : `, (index:string) => {
        if (isNaN(Number(index))) {
          return reject('請輸入數字');
        } else if (Number(index) > this.hand.cards.length - 1) {
          return reject('無效編號');
        }
        return resolve(this.hand.drawCard(Number(index)));
      });
    });
  }
}
