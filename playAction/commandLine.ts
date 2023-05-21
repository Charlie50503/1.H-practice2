import { PlayAction } from "./playAction";

export class CommandLine implements PlayAction {
  do(): void {
    console.log("commandLine");
  }
}