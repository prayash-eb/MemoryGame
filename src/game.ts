import { saveGame, loadGame } from "./storage.js";
import { updateScore, renderBoard } from "./ui.js";

export interface BoxState {
  matched: boolean;
  flipped: boolean;
  sticker: string;
}

export class MemoryGame {
  private lockBoard: boolean = false;
  private boxStates: BoxState[] = [];
  private board!: HTMLDivElement;
  private firstBox: HTMLDivElement | null = null;
  private secondBox: HTMLDivElement | null = null;
  private score: number = 0;

  constructor(
    private boardID: string,
    private m: number,
    private n: number,
    private stickers: string[]
  ) {
    const el = document.getElementById(boardID) as HTMLDivElement;
    if (!el) {
      alert(`Board element with id ${boardID} not found`);
      return;
    }
    this.board = el;
    this.stickers = stickers;
  }

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private initBoxStates() {
    const pairStickers = this.shuffle([
      ...this.stickers,
      ...this.stickers
    ]).slice(0, this.m * this.n);
    this.boxStates = pairStickers.map((sticker, index) => ({
      flipped: false,
      matched: false,
      sticker,
    }));
    this.score = 0;
    updateScore(this.score);
  }

  private resetTurn(): void {
    this.firstBox = null;
    this.secondBox = null;
    this.lockBoard = false;
  }

  private resetGame(): void {
    localStorage.removeItem("MemoryGame");
    this.initBoxStates();
    renderBoard(this.board, this.boxStates, this.m, this.n, (box, index) =>
      this.handleClick(box, index)
    );
  }

  private handleClick(box: HTMLDivElement, index: number) {
    if (this.lockBoard || box.classList.contains("flipped")) return;
    box.classList.add("flipped");
    this.boxStates[index].flipped = true;
    if (!this.firstBox) {
      this.firstBox = box;
      saveGame(this.boxStates, this.score);
      return;
    }
    this.secondBox = box;
    this.lockBoard = true;

    const firstIndex = Array.from(
      this.board.children as HTMLCollection
    ).indexOf(this.firstBox);
    const secondIndex = index;

    const firstSticker = this.boxStates[firstIndex].sticker;
    const secondSticker = this.boxStates[secondIndex].sticker;

    if (firstSticker === secondSticker) {
      this.boxStates[firstIndex].matched = true;
      this.boxStates[secondIndex].matched = true;
      this.score++;
      updateScore(this.score);
      this.resetTurn();
      saveGame(this.boxStates, this.score);
    } else {
      setTimeout(() => {
        this.firstBox?.classList.remove("flipped");
        this.secondBox?.classList.remove("flipped");
        this.boxStates[firstIndex].flipped = false;
        this.boxStates[secondIndex].flipped = false;
        this.resetTurn();
        saveGame(this.boxStates, this.score);
      }, 800);
    }
  }

  init() {
    // if there is state saved in local environment
    const savedGame = loadGame();
    if (savedGame) {
      this.boxStates = savedGame.boxStates;
      this.score = savedGame.score;
      updateScore(this.score)
    } else {
      // if not initalize a new game
      this.initBoxStates();
    }
    renderBoard(this.board, this.boxStates, this.m, this.n, (box, index) =>
      this.handleClick(box, index)
    );

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetGame());
    }
  }
}
