import { AIHand } from '../hand/aiHand';
import { ShowdownGame } from '../showdownGame';
import { Player } from './player';

export class AI extends Player {
  constructor(name: string, showdownGame: ShowdownGame, playerId: number) {
    const hand = new AIHand();
    super(name, showdownGame, hand, playerId);
  }
}
