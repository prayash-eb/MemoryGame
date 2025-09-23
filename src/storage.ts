import { BoxState } from "./game.js";

export function loadGame(): {
  boxStates: BoxState[];
  score: number;
} | null {
  const gameState = localStorage.getItem("MemoryGame");
  if (!gameState) return null;

  return JSON.parse(gameState);
}

export function saveGame(boxStates: BoxState[], score: number): void {
  localStorage.setItem(
    "MemoryGame",
    JSON.stringify({
      boxStates,
      score,
    })
  );
}
