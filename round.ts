import { Card } from './card';

export class PlayCard {
  playerId: number;
  card: Card;

  constructor(playerId: number, card: Card) {
    this.playerId = playerId;
    this.card = card
  }
  sumPoints() {
    return this.card.rank.value + this.card.suit.value;
  }
}

export class WinnerCard {
  playerId: number = -1;
  point: number = 0;

  setPlayerId(playerId: number) {
    this.playerId = playerId
  }

  setPoint(point: number) {
    this.point = point
  }
}

export class Round {
  playCards: PlayCard[] = [];
  roundIndex: number = 0; // 每一局內執行到哪個玩家

  addPlayCard(playCard: PlayCard) {
    this.playCards.push(playCard);
  }
  sumPoints(card: Card) {
    return card.rank.value + card.suit.value;
  }
  showdown() {
    let winnerCard = new WinnerCard();
    this.playCards.forEach((playCard) => {
      if (winnerCard.point < playCard.sumPoints()) {
        winnerCard.setPlayerId(playCard.playerId)
        winnerCard.setPoint(playCard.sumPoints())
      }
    });
    return winnerCard.playerId;
  }
}
