import { Card } from './card';
import { Rank } from './interfaces/rank';
import { Suit } from './interfaces/suit';

export class Deck {
  cards: Card[] = [];

  constructor() {
    // 建立牌組 52 張卡
    for (let suit in Suit) {
      if (isNaN(Number(suit))) {
        for (let rank in Rank) {
          if (!isNaN(Number(rank))) {
            this.cards.push(new Card(Suit[suit as keyof typeof Suit], Rank[rank as keyof typeof Rank]));
          }
        }
      }
      console.log(this.cards);
      
    }
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

  drawCard() {}
}
