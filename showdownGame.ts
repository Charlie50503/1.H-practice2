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
  public async initGame() {
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

  public async startGame() {
    for (let index = 0; index < this.globalRoundCount; index++) {
      await this.runOneRound();
    }
    // 遊戲結束，計算並顯示最終勝者
    let maxPoints = Math.max(...this.players.map((p) => p.point));
    let finalWinner = this.players.find((p) => p.point === maxPoints);
    console.log(`遊戲結束，最終勝者是： 玩家 ${finalWinner?.name}`);
    await rl.close();
  }

  private async runOneRound() {
    const round = new Round();
    for (const player of this.players) {
      if (!player.isExchangedHards) {
        const isGoChoiceDoExchangeHands = await player
          .choiceDoExchangeHands()
          .catch((error) => {
            console.log(error);
            return this.reselectChoiceDoExchangee(player);
          });
        if (isGoChoiceDoExchangeHands) {
          if (player.type === PlayerType.HUMAN) {
            await this.viewPlayers();
          }
          const exchangee = await player
            .choiceExchangee(this.players)
            .catch((error) => {
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
        const playerCard = new PlayCard(player.playerId, card);
        round.addPlayCard(playerCard);
      }
          
      if(player.exchangeHands.isExchanging && !player.exchangeHands.isReadyToSwitchBack()) {
        player.exchangeHands.incrementExchangeTurns();
        if(player.exchangeHands.isReadyToSwitchBack()){
          player.doExchangeHandsBack();
        }
      }
    }

    const winnerId = round.showdown();
    let winner = this.players.find((player) => {
      return player.playerId === winnerId;
    });
    if (winner) {
      winner.point++;

      console.log(
        `玩家編號${winner.playerId} 玩家名稱:${winner.name} 贏得 1 分`
      );
    }
  }

  private async reselectCard(player: Player): Promise<Card | null> {
    return this.reselectWithErrorHandling(
      player,
      () => player.showCard(),
      '選擇了無效的牌'
    );
  }

  private async reselectChoiceDoExchangee(player: Player): Promise<boolean> {
    return this.reselectWithErrorHandling(
      player,
      () => player.choiceDoExchangeHands(),
      '選擇了無效玩家代號'
    );
  }

  private async reselectExchangee(player: Player): Promise<Player> {
    return this.reselectWithErrorHandling(
      player,
      () => player.choiceExchangee(this.players),
      '選擇了無效玩家代號'
    );
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
    // console.log(this.players[0].hand.cards);
    // console.log(this.players[0].hand.cards.length);
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

  private async viewPlayers() {
    this.players.forEach((player) => {
      console.log('玩家編號: ', player.playerId, '玩家名稱: ', player.name);
    });
  }

  private async reselectWithErrorHandling<T>(
    player: Player,
    operation: () => Promise<T>,
    errorMsg: string
  ): Promise<T> {
    console.log(`玩家${player.name}${errorMsg}，請重新選擇。`);

    try {
      return await operation();
    } catch (error) {
      console.log(`再次選擇了無效的選擇：${error}`);
      return this.reselectWithErrorHandling(player, operation, errorMsg);
    }
  }
}
