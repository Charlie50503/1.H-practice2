import { Card } from './card';
import { Deck } from './deck';
import { PlayCard } from './playCard';
import { AI } from './player/ai';
import { Human } from './player/human';
import { Player, PlayerType } from './player/player';
import { Round } from './round';
import rl from './utils/readline';

export class ShowdownGame {
  playerSize = 4;
  players: Player[] = [];

  globalRoundCount: number = 13;
  private deck!: Deck;

  constructor(deck: Deck) {
    // 初始化牌堆，含有52張牌。
    this.deck = deck;
  }
  public async initGame() {
    // 玩家（P1~P4）為自己取名。
    await this.createPlayers().catch((error) => {
      console.log(error);
      return this.createPlayers();
    });
    // 牌堆進行洗牌。
    await this.deck.shuffle();
    // 玩家抽牌
    await this.doDrawCard();
  }

  public async startGame() {
    for (let index = 0; index < this.globalRoundCount; index++) {
      const round = new Round(this.players);
      await round.startRound();
    }
    // 遊戲結束，計算並顯示最終勝者
    let maxPoints = Math.max(...this.players.map((p) => p.point));
    let finalWinner = this.players.find((p) => p.point === maxPoints);
    console.log(`遊戲結束，最終勝者是： 玩家 ${finalWinner?.name}`);
    await rl.close();
  }

  private addPlayer(player: Player) {
    this.players.push(player);
  }

  private async createPlayers() {
    try {
      for (let index = 1; index <= this.playerSize; index++) {
        const player = await this.createPlayer(index).catch((error) => {
          console.log(error);
          return this.createPlayer(index);
        });
        this.addPlayer(player as Player);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private doDrawCard() {
    // 抽牌 抽到 52 張抽完為止
    for (let index = 0; index < 13; index++) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard());
      });
    }

    this.players.forEach((player) => {
      console.log('-------------------------');
      console.log(`玩家${player.name}的手牌：`);
      player.hand.viewCards();
      console.log('-------------------------');
    });
  }

  private createPlayer(index: number): Promise<Player> {
    return new Promise((resolve, reject) => {
      rl.question(`請輸入第${index}位玩家名稱：`, (name: string) => {
        rl.question(
          '這是一個普通玩家還是AI玩家（輸入 "一般" 或 "AI"）：',
          (type: string) => {
            let player: Player | null = null;
            if (type === 'AI') {
              player = new AI(name, index);
            } else if (type === '一般') {
              player = new Human(name, index);
            } else {
              reject("輸入的玩家類型無效。請輸入 '一般' 或 'AI'。");
              return;
            }
            resolve(player);
          }
        );
      });
    });
  }
}
