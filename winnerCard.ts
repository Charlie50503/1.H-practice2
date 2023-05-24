
export class WinnerCard {
  playerId: number = -1;
  point: number = 0;

  setPlayerId(playerId: number) {
    this.playerId = playerId
  }

  setPoint(point: number) {
    this.point = point
  }
}