import { BoxState } from "./types/index.js";

export function updateScore(score: number): void {
  const scoreDiv = document.getElementById("score")!;
  scoreDiv.textContent = `Score:${score}`;
}

export function updateTries(totalTries: number): void {
  const triesDiv = document.getElementById("tries")!;
  triesDiv.textContent = `Total number of tries: ${totalTries}`
}

export function renderBoard(
  board: HTMLDivElement,
  boxStates: BoxState[],
  handleClick: (box: HTMLDivElement, index: number) => void
) {
  if (!board) return;
  board.innerHTML = "";
  // using grid to render square based board based on boxState length
  board.style.gridTemplateColumns = `repeat(${Math.sqrt(boxStates.length)},auto)`

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
