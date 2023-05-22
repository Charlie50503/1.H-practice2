import { Deck } from './deck';
import { CommandLine } from './playAction/commandLine';
import { Randomly } from './playAction/radomly';
import { AI } from './player/ai';
import { Human } from './player/human';
import { Player } from './player/player';
import rl from './utils/readline';

export class ShowdownGame {
  playerSize = 4;
  players: Player[] = [];

  globalRoundCount: number = 13;
  private deck!: Deck;

  constructor(deck: Deck) {
    this.deck = deck;
  }
  async start() {
    // 玩家（P1~P4）為自己取名。
    await this.createPlayers();
    rl.close();
    this.deck.shuffle();
    console.log(this.deck.cards);
    
    // 初始化牌堆，含有52張牌。
    // 牌堆進行洗牌。
  }

  nextRound() {
    // this.roundCount--;
  }

  nextRoundIndex() {}

  addPlayer(player: Player) {
    this.players.push(player);
  }

  async createPlayers() {
    try {
      for (let index = 1; index <= this.playerSize; index++) {
        this.addPlayer(await this.createPlayer(index));
        // console.log(showdownGame.players);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // createPlayers();
  createPlayer(index: number): Promise<Player> {
    return new Promise((resolve, reject) => {
      rl.question(`請輸入第${index}位玩家名稱：`, (name) => {
        rl.question(
          '這是一個普通玩家還是AI玩家（輸入 "一般" 或 "AI"）：',
          (type) => {
            let player: Player | null = null;
            if (type === 'AI') {
              player = new AI(name, new Randomly(), this);
            } else if (type === '一般') {
              player = new Human(name, new CommandLine(), this);
            } else {
              reject(new Error("輸入的玩家類型無效。請輸入 '一般' 或 'AI'。"));
              return;
            }

            resolve(player);
          }
        );
      });
    });
  }
}
