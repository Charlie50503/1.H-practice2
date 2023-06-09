import { Deck } from './deck';
import { Player } from './player/player';
import { PlayerFactory } from './player/playerFactory';
import { Round } from './round';
import rl from './utils/readline';

export class ShowdownGame {
  private playerFactory: PlayerFactory;
  playerSize = 4;
  players: Player[] = [];
  globalRoundCount: number = 13;
  private deck!: Deck;

  constructor(deck: Deck) {
    // 初始化牌堆，含有52張牌。
    this.deck = deck;
    this.playerFactory = new PlayerFactory(this.playerSize);
  }
  public async initGame() {
    // 玩家（P1~P4）為自己取名。
    this.players = await this.playerFactory.createPlayers();
    // 牌堆進行洗牌。
    await this.deck.shuffle();
    // 玩家抽牌
    await this.doDrawCard();
    // 顯示玩家卡牌
    this.viewPlayersHands();
  }

  public async startGame() {
    for (let index = 0; index < this.globalRoundCount; index++) {
      const round = new Round(this.players);
      await round.startRound();
    }
    this.declareWinner();
    await rl.close();
  }

  private doDrawCard() {
    // 抽牌 抽到 52 張抽完為止
    for (let index = 0; index < 13; index++) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard());
      });
    }
  }

  private declareWinner() {
    let maxPoints = Math.max(...this.players.map((p) => p.point));
    let finalWinners = this.players.filter((p) => p.point === maxPoints);
    let winnersNames = finalWinners.map((w) => w.name).join(', ');
    console.log(`遊戲結束，最終勝者是： 玩家 ${winnersNames}`);
  }

  private viewPlayersHands(){
    this.players.forEach((player) => {
      console.log('-------------------------');
      console.log(`玩家${player.name}的手牌：`);
      player.hand.viewCards();
      console.log('-------------------------');
    });
  }
}
