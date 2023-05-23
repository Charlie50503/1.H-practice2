import { HumanHand } from '../hand/humanHand';
import { Player } from './player';

export class Human extends Player {
  constructor(name: string, playerId: number) {
    const hand = new HumanHand();
    super(name, hand, playerId);
  }
}
