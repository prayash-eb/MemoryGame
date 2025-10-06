
export type StickerType = {
    id: number,
    value: string
}

export interface BoxState {
  matched: boolean;
  flipped: boolean;
  sticker: string;
  stickerId: number
}