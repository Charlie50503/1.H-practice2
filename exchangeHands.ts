import { Player } from './player/player';
export class ExchangeHands {
  validExchangeTurns:number;
  currentExchangeTurns:number;
  exchanger:Player
  exchangee!:Player
  isExchanging = false;

  constructor(validExchangeTurnsCount:number,exchanger:Player){
    this.validExchangeTurns = validExchangeTurnsCount;
    this.currentExchangeTurns = 0;
    this.exchanger = exchanger;
  }
  public exchange(){
    if(!this.exchangee){
      throw Error("請先設定被交換的玩家")
    }
    console.log("--------------");
    console.log("被交換玩家的手牌");
    console.log(this.exchangee.hand.viewCards());

    console.log("要交換玩家的手牌");
    console.log(this.exchanger.hand.viewCards());
    
    console.log("--------------");
    const tempHand = this.exchanger.hand
    this.exchanger.hand = this.exchangee.hand
    this.exchangee.hand = tempHand
  }
  public switchHandsBack(){
    if(!this.exchangee){
      throw Error("請先設定被交換的玩家")
    }
    const tempHand = this.exchangee.hand
    this.exchangee.hand = this.exchanger.hand
    this.exchanger.hand = tempHand
  }
  isReadyToSwitchBack(): boolean {
    // 檢查是否還能進行交換
    return this.currentExchangeTurns >=  this.validExchangeTurns;
  }
  public incrementExchangeTurns(){
    if(this.isExchanging){
      this.currentExchangeTurns++;
      console.log("目前交換回合",this.currentExchangeTurns);
    }
  }
  public setExchangee(exchangee:Player){
    this.exchangee = exchangee
  }

  public setIsExchanging(isExchanging:boolean){
    this.isExchanging = isExchanging;
  }
}