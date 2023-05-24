import { Card } from '../card';
import rl from '../utils/readline';
import { Hand } from './hand';

export class HumanHand extends Hand {
  // showCard by commandline input
  // showCard(): Promise<Card> {
  //   this.viewCards();
  //   return new Promise((resolve, reject) => {
  //     rl.question(`請選擇要出的牌 : `, (index:string) => {
  //       if (isNaN(Number(index))) {
  //         return reject('請輸入數字');
  //       } else if (Number(index) > this.cards.length - 1) {
  //         return reject('無效編號');
  //       }
  //       return resolve(this.drawCard(Number(index)));
  //     });
  //   });
  // }


}
