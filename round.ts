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

  public addPlayCard(playCard: PlayCard) {
    this.playCards.push(playCard);
  }

  public showdown() {
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

  public async startRound() {
    for (const player of this.players) {
      if (!player.isExchangedHards) {
        const isHandExchangeChosen = await this.reselectWithErrorHandling(
          player,
          () => player.chooseToExchangeHands(),
          '選擇了無效玩家代號'
        );

        // const isHandExchangeChosen = await player
        //   .chooseToExchangeHands()
        //   .catch((error) => {
        //     console.log(error);
        //     return this.reselectChooseToExchangeHands(player);
        //   });
        if (isHandExchangeChosen) {
          if (player.type === PlayerType.HUMAN) {
            await this.viewPlayers();
          }
          const exchangee = await this.reselectWithErrorHandling(
            player,
            () => player.chooseExchangee(this.players),
            '選擇了無效玩家代號'
          );
          // const exchangee = await player
          //   .chooseExchangee(this.players)
          //   .catch((error) => {
          //     return this.reselectExchangee(player);
          //   });
          player.doExchangeHands(exchangee);
        }
      }
      const card = await this.reselectWithErrorHandling(
        player,
        () => player.showCard(),
        '選擇了無效的牌'
      );
      // const card = await player.showCard().catch((error) => {
      //   console.log(`玩家${player.name}選擇了無效的牌：${error}`);
      //   return this.reselectCard(player);
      // });
      if (card) {
        const playerCard = new PlayCard(player.playerId, card);
        this.addPlayCard(playerCard);
      }

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

    const winnerId = this.showdown();
    let winner = this.players.find((player) => {
      return player.playerId === winnerId;
    });
    if (winner) {
      winner.point++;

      console.log(
        '玩家編號: ',
        winner.playerId,
        '玩家名稱: ' + winner.name + ' 贏得 1 分'
      );
    }
  }

  private async viewPlayers() {
    this.players.forEach((player) => {
      console.log('玩家編號: ', player.playerId, '玩家名稱: ', player.name);
    });
  }

  private async reselectCard(player: Player): Promise<Card | null> {
    return this.reselectWithErrorHandling(
      player,
      () => player.showCard(),
      '選擇了無效的牌'
    );
  }

  private async reselectChooseToExchangeHands(
    player: Player
  ): Promise<boolean> {
    return this.reselectWithErrorHandling(
      player,
      () => player.chooseToExchangeHands(),
      '選擇了無效玩家代號'
    );
  }

  private async reselectExchangee(player: Player): Promise<Player> {
    return this.reselectWithErrorHandling(
      player,
      () => player.chooseExchangee(this.players),
      '選擇了無效玩家代號'
    );
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
      console.log(`玩家${player.name}${errorMsg}，請重新選擇。`);
      return this.reselectWithErrorHandling(player, operation, errorMsg);
    }
  }
}
