import { MemoryGame } from "./game.js";

const Stickers: string[] = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍓", "🍍", "🥝"];

const Game = new MemoryGame("board", 4, 4, Stickers);
console.log("Game initialized");
Game.init()