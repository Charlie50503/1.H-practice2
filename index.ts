import { Deck } from './deck';
import { ShowdownGame } from './showdownGame';

const showdownGame = new ShowdownGame(new Deck());

async function main() {
  await showdownGame.initGame();
  await showdownGame.startGame();
}

main();
