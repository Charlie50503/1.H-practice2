import { Card } from '../card';
import { Hand } from './hand';

export class AIHand extends Hand {
  showCard(): Promise<Card> {
    if (this.cards.length === 0) {
      throw new Error('牌組已空，無法再抽牌');
    }
    return new Promise((resolve) => {
      const index = Math.floor(Math.random() * this.cards.length);
      resolve(this.drawCard(index));
    });
  }
}
