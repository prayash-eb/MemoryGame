import { BoxState } from "./types/index.js";

export function loadGame(): {
  boxStates: BoxState[];
  score: number;
  totalTries: number
} | null {
  const gameState = localStorage.getItem("MemoryGame");
  if (!gameState) return null;

  return JSON.parse(gameState);
}

export function saveGame(boxStates: BoxState[], score: number, totalTries: number): void {
  localStorage.setItem(
    "MemoryGame",
    JSON.stringify({
      boxStates,
      score,
      totalTries,
    })
  );
}
