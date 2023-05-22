import { Deck } from './deck';
import { ShowdownGame } from './showdownGame';

const showdownGame = new ShowdownGame(new Deck());

showdownGame.start();
