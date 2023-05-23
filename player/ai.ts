import { AIHand } from '../hand/aiHand';
import { Player } from './player';

export class AI extends Player {
  constructor(name: string, playerId: number) {
    const hand = new AIHand();
    super(name, hand, playerId);
  }
}
