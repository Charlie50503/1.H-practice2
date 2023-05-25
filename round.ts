import { Card } from './card';
import { PlayCard } from './playCard';
import { Player, PlayerType } from './player/player';
import { WinnerCard } from './winnerCard';

export class Round {
  playCards: PlayCard[] = [];
  roundIndex: number = 0; // 每一局內執行到哪個玩家
  players: Player[] = [];
  constructor(players: Player[]) {
    this.players = players;
  }

  public async startRound() {
    for (const player of this.players) {
      await this.handlePlayerTurn(player);
    }
    this.determineWinner();
  }

  private async handlePlayerTurn(player: Player) {
    await this.exchangeTurn(player);
    await this.showCardTurn(player);
    this.switchExchangeHandsBackHandle(player)
  }

  private async exchangeTurn(player: Player){
    if(player.isExchangedHands){
      return
    }

    const isHandExchangeChosen = await this.reselectWithErrorHandling(
      player,
      () => player.chooseToExchangeHands(),
      '輸入了無效內容'
    );

    if (isHandExchangeChosen) {
      if (player.type === PlayerType.HUMAN) {
        await this.viewPlayers();
      }

      const exchangee = await this.reselectWithErrorHandling(
        player,
        () => player.chooseExchangee(this.players),
        '選擇了無效玩家代號'
      );

      player.doExchangeHands(exchangee);
    }
  }

  private async showCardTurn(player: Player) {
    const card = await this.reselectWithErrorHandling(
      player,
      () => player.showCard(),
      '選擇了無效的牌'
    );

    if (card) {
      const playerCard = new PlayCard(player.playerId, card);
      this.playCards.push(playerCard);
    }
  }

  private switchExchangeHandsBackHandle(player: Player) {
    if (
      player.handExchange.isExchanging &&
      !player.handExchange.isReadyToSwitchBack()
    ) {
      player.handExchange.incrementExchangeTurns();
      if (player.handExchange.isReadyToSwitchBack()) {
        player.doExchangeHandsBack();
      }
    }
  }

  private determineWinner() {
    const winnerId = this.showdown();
    const winner = this.players.find((player) => player.playerId === winnerId);

    if (winner) {
      winner.point++;
      console.log(
        '玩家編號: ',
        winner.playerId,
        '玩家名稱: ' + winner.name + ' 贏得 1 分'
      );
    }
  }

  private showdown() {
    let winnerCard = new WinnerCard();
    this.playCards.forEach((playCard) => {
      console.log(
        '玩家編號: ',
        playCard.playerId,
        '總分: ',
        playCard.sumPoints()
      );
      if (winnerCard.point < playCard.sumPoints()) {
        winnerCard.setPlayerId(playCard.playerId);
        winnerCard.setPoint(playCard.sumPoints());
      }
    });
    return winnerCard.playerId;
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
    try {
      return await operation();
    } catch (error) {
      console.log(`${error}`);
      console.log(`玩家${player.name} ${errorMsg}，請重新選擇。`);
      return this.reselectWithErrorHandling(player, operation, errorMsg);
    }
  }
}
