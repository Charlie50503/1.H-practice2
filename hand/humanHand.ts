import { Card } from "../card";
import rl from "../utils/readline";
import { Hand } from "./hand";

export class HumanHand extends Hand {
  // showCard by commandline input
  showCard(): Promise<Card> {
    this.viewCard();
    return new Promise((resolve, reject) => {
      rl.question(`請選擇要出的牌 : `, (index) => {
        if(isNaN(Number(index))){
          return reject("請輸入數字");
        }else if(Number(index)> this.cards.length-1){
          return reject("無效編號");
        }
        return resolve(this.drawCard(Number(index)));
      });
    })
  }

  viewCard(): void {
    this.cards.forEach((card,index) => {
      console.log(`手牌編號:${index}, 花色:${card.suit.type}, 數字:${card.rank.type}`);
    });
  }
}