const gridCells = document.querySelectorAll(".grid-cell");
const resetButton = document.querySelector(".reset-btn");
const playerTurnDisplay = document.querySelector(".player-turn");

let isPlayerXTurn = true;

const winningCombinations = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
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
  resetButton.innerHTML = "Reset";
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
      resetButton.innerHTML = "Play Again";
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
    playerTurnDisplay.innerHTML = "It's a Tie!";
    resetButton.innerHTML = "Play Again";
  }
};
