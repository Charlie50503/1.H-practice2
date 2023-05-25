import rl from '../utils/readline';
import { AI } from './ai';
import { Human } from './human';
import { Player } from './player';

export class PlayerFactory {
  constructor(private playerSize: number) {}

  public async createPlayers(): Promise<Player[]> {
    let players: Player[] = [];
    for (let index = 1; index <= this.playerSize; index++) {
      const player = await this.createPlayer(index);
      players.push(player);
    }
    return players;
  }

  private async createPlayer(index: number): Promise<Player> {
    while (true) {
      try {
        const name = await this.inputPlayerName(index);
        const type = await this.inputPlayerType();
        return this.instantiatePlayer(name, type, index);
      } catch (error) {
        console.log(error);
      }
    }
  }

  private async inputPlayerName(index: number): Promise<string> {
    return new Promise((resolve) => {
      rl.question(`請輸入第${index}位玩家名稱：`, (name: string) => {
        return resolve(name);
      });
    });
  }

  private async inputPlayerType(): Promise<string> {
    return new Promise((resolve, reject) => {
      rl.question(
        '這是一個普通玩家還是AI玩家（輸入 "一般" 或 "AI"）：',
        (type: string) => {
          if (type !== '一般' && type !== 'AI') {
            return reject("輸入的玩家類型無效。請輸入 '一般' 或 'AI'。");
            
          }
          return resolve(type);
        }
      );
    });
  }

  private instantiatePlayer(name: string, type: string, index: number): Player {
    if (type === 'AI') {
      return new AI(name, index);
    } else {
      // 在這裡我們已經確保 type 只能是 "一般" 或 "AI"，所以可以安全地假設這裡是 "一般"
      return new Human(name, index);
    }
  }
}
