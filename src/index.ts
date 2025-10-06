import { MemoryGame } from "./game.js";
import { StickerType } from "./types/index.js";

const Stickers: string[] = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍓", "🍍", "🥝"];

const StickersInfo: StickerType[] = Stickers.map((sticker, index) => ({
    id: index + 1,
    value: sticker,
}))

// added Error element in html to show error during game initialization
const errorElement = document.getElementById("error-message")!

const board = document.getElementById("board")! as HTMLDivElement
try {
    const Game = new MemoryGame(board, StickersInfo);
    Game.init()
} catch (error: any) {
    errorElement.textContent = `Error: ${error?.message}`
}
