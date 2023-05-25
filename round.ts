import { Card } from './card';
import { PlayCard } from './playCard';
import { WinnerCard } from './winnerCard';

export class Round {
  playCards: PlayCard[] = [];
  roundIndex: number = 0; // 每一局內執行到哪個玩家

  public addPlayCard(playCard: PlayCard) {
    this.playCards.push(playCard);
  }
  
  public showdown() {
    let winnerCard = new WinnerCard();
    this.playCards.forEach((playCard) => {
      console.log(`玩家編號:${playCard.playerId} 總分 ${playCard.sumPoints()}`)
      if (winnerCard.point < playCard.sumPoints()) {
        winnerCard.setPlayerId(playCard.playerId)
        winnerCard.setPoint(playCard.sumPoints())
      }
    });
    return winnerCard.playerId;
  }
}
