import { Card } from './card';
import { ranks } from './interfaces/rank';
import { suits } from './interfaces/suit';

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.initDeck();
  }
  // 洗牌 使用 Fisher-Yates Shuffle 算法
  shuffle() {
    let m = this.cards.length,
      t,
      i;
    // 如果還剩有元素未洗牌
    while (m) {
      // 選取剩餘元素…
      i = Math.floor(Math.random() * m--);
      // 並與當前元素進行交換
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
    }
  }
  // 建立牌組 52 張卡
  initDeck() {
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        this.cards.push(new Card(suit, rank));
      });
    });
    // console.log(this.cards);
    // console.log(this.cards.length);
  }

  drawCard(): Card {
    return this.cards.pop() as Card;
  }
}
