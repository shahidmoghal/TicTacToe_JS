const gridCells = document.querySelectorAll(".grid-cell");
const resetButton = document.querySelector(".reset-btn");
const playerTurnDisplay = document.querySelector(".player-turn");

let isPlayerXTurn = true;

const winningCombinations = [
  [0, 1, 2], // Top Row
  [3, 4, 5], // Middle Row
  [6, 7, 8], // Bottom Row
  [0, 3, 6], // Left Column
  [1, 4, 7], // Middle Column
  [2, 5, 8], // Right Column
  [0, 4, 8], // Main Diagonal
  [2, 4, 6], // Anti-Diagonal
];

gridCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isPlayerXTurn) {
      cell.innerHTML = "X";
      playerTurnDisplay.innerHTML = "Player Turn - O";
    } else {
      cell.innerHTML = "O";
      playerTurnDisplay.innerHTML = "Player Turn - X";
    }
    cell.disabled = true;
    isPlayerXTurn = !isPlayerXTurn;
    checkForWinner();
  });
});

resetButton.addEventListener("click", () => {
    resetButton.innerHTML= 'Reset';
  gridCells.forEach((cell) => {
    cell.innerHTML = "";
    cell.disabled = false;
  });
  isPlayerXTurn = true;
  playerTurnDisplay.innerHTML = "Player Turn - X";
});

const checkForWinner = () => {
  let isTie = true;

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    const cellA = gridCells[a].innerHTML;
    const cellB = gridCells[b].innerHTML;
    const cellC = gridCells[c].innerHTML;

    if (cellA !== "" && cellA === cellB && cellB === cellC) {
      playerTurnDisplay.innerHTML = `Winner is ${cellA}`;
      gridCells.forEach((cell) => {
        cell.disabled = true;
      });
      return;
    }
  }

  gridCells.forEach((cell) => {
    if (cell.innerHTML === "") {
      isTie = false;
    }
  });

  if (isTie) {
    playerTurnDisplay.innerHTML = "It's a Tie!"
    resetButton.innerHTML= 'Play Again';
  }
};
