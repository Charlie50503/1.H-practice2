import { HumanHand } from '../hand/humanHand';
import { ShowdownGame } from '../showdownGame';
import { Player } from './player';

export class Human extends Player {
  constructor(name: string, showdownGame: ShowdownGame, playerId: number) {
    const hand = new HumanHand();
    super(name, showdownGame, hand, playerId);
  }
}
