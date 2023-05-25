import { Card } from "./card";

export class PlayCard {
  playerId: number;
  card: Card;

  constructor(playerId: number, card: Card) {
    this.playerId = playerId;
    this.card = card
  }
  public sumPoints() {
    return this.card.rank.value + this.card.suit.value;
  }
}