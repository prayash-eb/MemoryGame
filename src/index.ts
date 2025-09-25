import { MemoryGame } from "./game.js";
import { BoardDimension, StickerType } from "./types/index.js";

const DIMENSION: BoardDimension = {
    ROW: 4,
    COLUMN: 4
}

const Stickers: string[] = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍓", "🍍", "🥝"];

const StickersInfo: StickerType[] = Stickers.map((sticker, index) => ({
    id: index + 1,
    value: sticker,
}))

// added Error element in html to show error during game initialization
const errorElement: HTMLElement = document.getElementById("error-message")!

try {
    const Game = new MemoryGame("board", DIMENSION.ROW, DIMENSION.COLUMN, StickersInfo);
    Game.init()
} catch (error: any) {
    errorElement.textContent = `Error: ${error?.message}`
    
}
