import { Card } from '../card';

export class Hand {
  private _cards: Card[] = [];

  constructor() {}

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    this._cards = value;
  }

  public addCard(card: Card) {
    this._cards.push(card);
  }
  // 抽出手牌
  public drawCard(index: number) {
    const drawnCard = this.cards[index];

    // 移除抽到的牌
    this.cards.splice(index, 1);

    return drawnCard;
  }

  public viewCards(): void {
    this.cards.forEach((card, index) => {
      console.log(
        `手牌編號:${index}, 花色:${card.suit.type}, 數字:${card.rank.type}`
      );
    });
  }
}
