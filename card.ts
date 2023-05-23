import { Rank } from './interfaces/rank';
import { Suit } from './interfaces/suit';

export class Card {
  private _suit!: Suit;

  private _rank!: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  public get suit(): Suit {
    return this._suit;
  }
  public set suit(value: Suit) {
    this._suit = value;
  }

  public get rank(): Rank {
    return this._rank;
  }
  public set rank(value: Rank) {
    this._rank = value;
  }
}
