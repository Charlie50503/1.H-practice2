
export class WinnerCard {
  playerId: number = -1;
  point: number = 0;

  public setPlayerId(playerId: number) {
    this.playerId = playerId
  }

  public setPoint(point: number) {
    this.point = point
  }
}