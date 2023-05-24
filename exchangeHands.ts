import { Player } from './player/player';
export class ExchangeHands {
  validExchangeTurns:number;
  currentExchangeTurns:number;
  exchanger:Player
  exchangee!:Player

  constructor(validExchangeTurnsCount:number,exchanger:Player){
    this.validExchangeTurns = validExchangeTurnsCount;
    this.currentExchangeTurns = 0;
    this.exchanger = exchanger;
  }
  exchange(){
    if(!this.exchangee){
      throw Error("請先設定被交換的玩家")
    }
    const tempHand = this.exchanger.hand
    this.exchanger.hand = this.exchangee.hand
    this.exchangee.hand = tempHand
  }
  changeBack(){
    if(!this.exchangee){
      throw Error("請先設定被交換的玩家")
    }
    const tempHand = this.exchangee.hand
    this.exchangee.hand = this.exchanger.hand
    this.exchanger.hand = tempHand
  }
  canExchange(): boolean {
    // 檢查是否還能進行交換
    return this.currentExchangeTurns < this.validExchangeTurns;
  }
  countDown(){
    this.validExchangeTurns--;
  }
  setExchangee(exchangee:Player){
    this.exchangee = exchangee
  }
}