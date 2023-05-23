import { Card } from './card';

export interface playCard {
  playerId: number;
  card: Card;
}

export class Round {
  playCards: playCard[] = [];
  roundIndex: number = 0; // 每一局內執行到哪個玩家

  addPlayCard(playCard: playCard) {
    this.playCards.push(playCard);
  }
  nextPlayer() {
    this.roundIndex++;
  }
  sumPoints(card: Card) {
    return card.rank.value + card.suit.value;
  }
  showdown() {
    let maxPointPlayer = {
      playerId: -1,
      point: -1,
    };
    this.playCards.forEach((playCard) => {
      if (maxPointPlayer.point < this.sumPoints(playCard.card)) {
        maxPointPlayer = {
          playerId: playCard.playerId,
          point: this.sumPoints(playCard.card),
        };
      }
    });
    return maxPointPlayer.playerId
  }
}
