import { saveGame, loadGame } from "./storage.js";
import { updateScore, renderBoard, updateTries } from "./ui.js";
import { StickerType, BoxState } from "./types/index.js";

export class MemoryGame {
  private lockBoard: boolean = false;
  private boxStates: BoxState[] = [];
  private firstBox: HTMLDivElement | null = null;
  private secondBox: HTMLDivElement | null = null;
  private score: number = 0;
  private totalTries: number = 0;

  constructor(
    private board: HTMLDivElement,
    private stickers: StickerType[]
  ) {
    this.board = board
    this.stickers = stickers;
  }

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private initBoxStates() {
    const pairStickers = this.shuffle([
      ...this.stickers,
      ...this.stickers,
    ]);
    this.boxStates = pairStickers.map((sticker) => ({
      flipped: false,
      matched: false,
      sticker: sticker.value,
      // included sticker id as well
      stickerId: sticker.id
    }));
    // reseting scores
    this.score = 0;
    this.totalTries = 0;
    // updating DOM
    updateScore(this.score);
    updateTries(this.totalTries)
  }

  private resetTurn(): void {
    this.firstBox = null;
    this.secondBox = null;
    this.lockBoard = false;
    this.totalTries++;
    updateTries(this.totalTries)
  }

  private resetGame(): void {
    // clear box references and remove board lock as well.
    this.resetTurn()
    this.initBoxStates();
    localStorage.removeItem("MemoryGame");
    renderBoard(this.board, this.boxStates, (box, index) =>
      this.handleClick(box, index)
    );
  }

  private handleClick(box: HTMLDivElement, index: number) {
    if (this.lockBoard || box.classList.contains("flipped")) return;
    box.classList.add("flipped");
    this.boxStates[index].flipped = true;
    if (!this.firstBox) {
      this.firstBox = box;
      return;
    }
    this.secondBox = box;
    this.lockBoard = true;

    const firstIndex = Array.from(
      this.board.children as HTMLCollection
    ).indexOf(this.firstBox);
    const secondIndex = index;

    // used stickerID for comparsion
    const firstSticker = this.boxStates[firstIndex].stickerId;
    const secondSticker = this.boxStates[secondIndex].stickerId;

    if (firstSticker === secondSticker) {
      this.boxStates[firstIndex].matched = true;
      this.boxStates[secondIndex].matched = true;
      this.score++;
      updateScore(this.score);
      this.resetTurn();
      saveGame(this.boxStates, this.score, this.totalTries);
    } else {
      setTimeout(() => {
        this.firstBox?.classList.remove("flipped");
        this.secondBox?.classList.remove("flipped");
        this.boxStates[firstIndex].flipped = false;
        this.boxStates[secondIndex].flipped = false;
        this.resetTurn();
        saveGame(this.boxStates, this.score, this.totalTries);
      }, 800);
    }
  }

  init() {
    // if there is state saved in local environment
    const savedGame = loadGame();
    if (savedGame) {
      this.boxStates = savedGame.boxStates;
      this.score = savedGame.score;
      this.totalTries = savedGame.totalTries;
      updateScore(this.score)
      updateTries(this.totalTries)
    } else {
      // if not, initalize a new game
      this.initBoxStates();
    }
    renderBoard(this.board, this.boxStates, (box, index) =>
      this.handleClick(box, index)
    );

    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetGame());
    }
  }
}
