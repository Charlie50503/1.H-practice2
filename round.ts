import { Card } from "./card";

export class Round {
  cards !:Card[];

  playCards!:[]
  roundIndex:number = 0; // 每一局內執行到哪個玩家
  nextPlayer(){
    this.roundIndex++;
  }
}