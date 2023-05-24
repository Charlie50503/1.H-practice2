import { Card } from './card';
import { PlayCard } from './PlayCard';
import { WinnerCard } from './winnerCard';

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
