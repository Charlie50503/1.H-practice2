import { Player } from './player';
// 玩家選擇要與哪位玩家（自己以外）交換手牌。
// 選擇後，雙方的手牌交換。
// 三回合後，雙方的手牌會交換回來。
// 如果有使用交換手牌或是被使用交換手牌的人不得在被交換
export class ExchangeHand {
  count: number = 3;

  exchanger: Player;
  exchangee: Player;

  constructor(exchanger: Player,exchangee: Player){
    this.exchangee = exchangee;
    this.exchanger = exchanger;
    this.exchangee.isExchangedHards = true;
    this.exchanger.isExchangedHards = true;
  }
  counterDown() {
    if (this.count == 0) {
      const exchangedHand = this.exchanger.hand;
      this.exchanger.hand = this.exchangee.hand;
      this.exchangee.hand = exchangedHand;
      this.exchangee.isExchangedHards = false;
      this.exchanger.isExchangedHards = false;
      this.count = 3;
    } else {
      this.count--;
    }
  }
}
