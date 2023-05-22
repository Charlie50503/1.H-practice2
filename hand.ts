import { Card } from "./card";

export class Hand {
  private _cards: Card[] = [];

  size: number = 0;

  constructor(cards: Card[]) {
    this.cards = this.cards;
  }

  showCard(index:number):Card{
    return this.cards[index];
  }

  getSize(){
    return this.cards.length
  }

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    if(this.cards.length == 4){
      
    }
    this._cards = value;
  }

  public addCard(card:Card){
    this._cards.push(card);
  }
}