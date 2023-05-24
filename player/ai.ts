import { Card } from '../card';
import { AIHand } from '../hand/aiHand';
import { Player, PlayerType } from './player';

export class AI extends Player {
  type = PlayerType.AI;
  constructor(name: string, playerId: number) {
    const hand = new AIHand();
    super(name, hand, playerId);
  }

  choiceDoExchangeHands(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const exchangeOptions = ['Y', 'N'];

      const index = Math.floor(Math.random() * exchangeOptions.length);

      const choice = exchangeOptions[index];

      if (choice === 'Y') {
        return resolve(true);
      }
      return resolve(false);
    });
  }

  choiceExchangee(players: Player[]): Promise<Player> {
    return new Promise((resolve, reject) => {
      let playerIdList = players.map((player) => player.playerId);

      // 移除自己的ID
      playerIdList = playerIdList.filter(
        (playerId) => playerId !== this.playerId
      );

      // 從剩餘數字中隨機選取一個
      const index = Math.floor(Math.random() * playerIdList.length);
      const targetPlayerId = playerIdList[index];
      const exchangee = players.find(
        (player) => player.playerId === targetPlayerId
      );
      if (!exchangee) {
        return reject('沒找到對應玩家');
      }
      return resolve(exchangee);
    });
  }

  showCard(): Promise<Card | null> {
    
    return new Promise((resolve) => {
      if (this.hand.cards.length === 0) {
        resolve(null);
      }
      const index = Math.floor(Math.random() * this.hand.cards.length);
      resolve(this.hand.drawCard(index));
    });
  }
}
