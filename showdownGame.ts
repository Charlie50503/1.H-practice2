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
    this.deck = deck;
  }
  async initGame() {
    // 玩家（P1~P4）為自己取名。
    await this.createPlayers().catch((error) => {
      console.log(error);
      return this.createPlayers();
    });
    // 關閉 command line input
    // await rl.close();
    // 初始化牌堆，含有52張牌。
    // 牌堆進行洗牌。
    await this.deck.shuffle();
    // 玩家抽牌
    await this.doDrawCard();

    //
  }

  async startGame() {
    for (let index = 0; index < this.globalRoundCount; index++) {
      await this.runOneRound();
    }
    // 遊戲結束，計算並顯示最終勝者
    let maxPoints = Math.max(...this.players.map((p) => p.point));
    let finalWinner = this.players.find((p) => p.point === maxPoints);
    console.log(`遊戲結束，最終勝者是： 玩家 ${finalWinner?.name}`);
    await rl.close();
    // P1~P4輪流：
    // TODO 決定是否使用「交換手牌」特權。
    // 出一張牌（其他玩家無法看見這張牌）。
    // 顯示P1~P4各出的牌。
    // 比較P1~P4出的牌，最大的牌獲得勝利，該玩家分數加一。

    // 特權使用：

    // 若玩家選擇使用「交換手牌」特權：
    // 選擇要與哪位玩家（自己以外）交換手牌。
    // 雙方的手牌交換。
    // 三回合後，雙方的手牌交換回來。

    // 遊戲結束：

    // 13回合後，每個玩家都已經出完牌，遊戲結束。
    // 計算最多分數的玩家為勝者，顯示勝者的名稱。
  }

  async runOneRound() {
    const round = new Round();
    for (const player of this.players) {
      if (!player.isExchangedHards) {
        const isGoChoiceDoExchangeHands = await player.choiceDoExchangeHands().catch((error) => {
          console.log(error);
          return this.reselectChoiceDoExchangee(player);
        });
        if (isGoChoiceDoExchangeHands) {
          if (player.type === PlayerType.HUMAN) {
            await this.viewPlayers();
          }
          const exchangee = await player.choiceExchangee(this.players).catch((error) => {
            return this.reselectExchangee(player);
          });
          player.doExchangeHands(exchangee);
        }
      }
      const card = await player.showCard().catch((error) => {
        console.log(`玩家${player.name}選擇了無效的牌：${error}`);
        return this.reselectCard(player);
      });
      if (card) {
        const playerCard = new PlayCard(player.playerId, card)
        round.addPlayCard(playerCard);
      }
    }      

    const winnerId = round.showdown();
    let winner = this.players.find((player) => {
      return player.playerId === winnerId;
    });
    if (winner) {
      winner.point++;

      console.log(`玩家編號${winner.playerId} 玩家名稱:${winner.name} 贏得 1 分`);
    }
  }

  async reselectCard(player: Player): Promise<Card | null> {
    return this.reselectWithErrorHandling(
      player, 
      () => player.showCard(), 
      '選擇了無效的牌'
    );
  }

  async reselectChoiceDoExchangee(player: Player): Promise<boolean> {
    return this.reselectWithErrorHandling(
      player, 
      () => player.choiceDoExchangeHands(), 
      '選擇了無效玩家代號'
    );
  }
  
  async reselectExchangee(player: Player): Promise<Player> {
    return this.reselectWithErrorHandling(
      player, 
      () => player.choiceExchangee(this.players), 
      '選擇了無效玩家代號'
    );
  }
  // async reselectCard(player: Player): Promise<Card> {
  //   console.log(`玩家${player.name}選擇了無效的牌，請重新選擇。`);

  //   return player.hand.showCard().catch((error) => {
  //     console.log(`再次選擇了無效的牌：${error}`);
  //     return this.reselectCard(player);
  //   });
  // }

  // async reselectChoiceDoExchangee(player: Player): Promise<boolean> {
  //   console.log(`玩家${player.name}選擇了無效玩家代號，請重新選擇。`);

  //   return player.choiceDoExchangeHands().catch((error) => {
  //     console.log(`再次選擇了無效的玩家代號：${error}`);
  //     return this.reselectChoiceDoExchangee(player);
  //   });
  // }

  // async reselectExchangee(player: Player): Promise<Player> {
  //   console.log(`玩家${player.name}選擇了無效玩家代號，請重新選擇。`);

  //   return player.choiceExchangee(this.players).catch((error) => {
  //     console.log(`再次選擇了無效的玩家代號：${error}`);
  //     return this.reselectExchangee(player);
  //   });
  // }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  async createPlayers() {
    try {
      for (let index = 1; index <= this.playerSize; index++) {
        const player = await this.createPlayer(index).catch((error) => {
          console.log(error);
          return this.createPlayer(index);
        })
        this.addPlayer(player as Player);
      }
    } catch (error) {
      console.log(error);
    }
  }

  doDrawCard() {
    // 抽牌 抽到 52 張抽完為止
    for (let index = 0; index < 13; index++) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard());
      });
    }

    this.players.forEach((player) => {
      console.log("-------------------------")
      console.log(`玩家${player.name}的手牌：`);
      player.hand.viewCards();
      console.log("-------------------------")
    });
    // console.log(this.players[0].hand.cards);
    // console.log(this.players[0].hand.cards.length);
  }

  createPlayer(index: number): Promise<Player> {
    return new Promise((resolve, reject) => {
      rl.question(`請輸入第${index}位玩家名稱：`, (name: string) => {
        rl.question(
          '這是一個普通玩家還是AI玩家（輸入 "一般" 或 "AI"）：',
          (type:string) => {
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

  async viewPlayers(){
    this.players.forEach((player) => {
      console.log("玩家編號: ",player.playerId,"玩家名稱: ",player.name)
    })
    
  }


  async reselectWithErrorHandling<T>(player: Player, operation: () => Promise<T>, errorMsg: string): Promise<T> {
    console.log(`玩家${player.name}${errorMsg}，請重新選擇。`);
  
    try {
      return await operation();
    } catch (error) {
      console.log(`再次選擇了無效的選擇：${error}`);
      return this.reselectWithErrorHandling(player, operation, errorMsg);
    }
  }
}
