import { BoxState } from "./game.js";

export function updateScore(score: number): void {
  const scoreDiv = document.getElementById("score")!;
  scoreDiv.textContent = `Score:${score}`;
}

export function renderBoard(
  board: HTMLDivElement,
  boxStates: BoxState[],
  m: number,
  n: number,
  handleClick: (box: HTMLDivElement, index: number) => void
) {
  if (!board) return;
  board.innerHTML = "";
  // using grid to render square based board based on 'n' value
  board.style.gridTemplateColumns = `repeat(${n},auto)`

  boxStates.forEach((state, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
        <div class="box-inner">
            <div class="box-front"></div>
            <div class="box-back">${state.sticker}</div>
        </div>
    `;
    if (state.flipped || state.matched) {
      box.classList.add("flipped");
    }
    box.addEventListener("click", () => handleClick(box, index));
    board.appendChild(box);
  });
}
