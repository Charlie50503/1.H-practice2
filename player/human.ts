import { HumanHand } from '../hand/humanHand';
import rl from '../utils/readline';
import { Player } from './player';

export class Human extends Player {
  constructor(name: string, playerId: number) {
    const hand = new HumanHand();
    super(name, hand, playerId);
  }

  
  choiceExchangee(players: Player[]): Promise<Player> {
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

  choiceDoExchangeHands(): Promise<boolean> {
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
}
