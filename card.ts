import { ComparisonResult } from "./interfaces/comparisonResult";
import { Rank } from "./interfaces/rank";
import { Suit } from "./interfaces/suit";

export class Card {
  private _suit: Suit;

  private _rank: Rank;


  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  showdown(card: Card) {
    this.compare(card);
  }


  compare(other: Card): ComparisonResult {
    if (this.rank > other.rank) {
      return ComparisonResult.Greater;
    } else if (this.rank < other.rank) {
      return ComparisonResult.Less;
    } else {  // ranks are equal, compare suits
      if (this.suit > other.suit) {
        return ComparisonResult.Greater;
      } else if (this.suit < other.suit) {
        return ComparisonResult.Less;
      } else {
        return ComparisonResult.Equal;
      }
    }
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