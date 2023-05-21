import { PlayAction } from "./playAction";

export class Randomly implements PlayAction {
  do(): void {
    console.log("Randomly");
  }
}