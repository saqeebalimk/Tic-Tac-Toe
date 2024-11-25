const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
const gameContainer = document.getElementById('gameContainer');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

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

// Check for a winner or tie
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return gameState.every(cell => cell) ? 'Tie' : null;
}

// Handle a player's move
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  // Ignore clicks on already-taken cells or after the game is over
  if (gameState[index] || resultMessage.textContent) return;

  // Mark the cell and update the game state
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for a winner or a tie
  const winner = checkWinner();
  if (winner) {
    showResult(winner === 'Tie' ? "It's a Draw!" : `Player ${winner} Wins!`);
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Display the result screen
function showResult(message) {
  resultMessage.textContent = message;
  gameContainer.style.display = 'none';
  resultScreen.style.display = 'flex';
}

// Reset the game to its initial state
function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  resultMessage.textContent = '';

  // Clear all cells and re-enable interactions
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });

  // Reapply event listeners
  attachEventListeners();
}

// Start a new game from the result screen
function startNewGame() {
  resetGame();
  resultScreen.style.display = 'none';
  gameContainer.style.display = 'block';
}

// Attach event listeners to the cells
function attachEventListeners() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick); // Remove existing listeners
    cell.addEventListener('click', handleCellClick); // Add fresh listeners
  });
}

// Attach click and touch listeners for all cells
attachEventListeners();

// Event listeners for buttons
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);


// Detect touch or click for cell interaction
function handleCellTouch(event) {
  event.preventDefault(); // Prevent default touch actions (e.g., scrolling)
  handleCellClick(event);
}

// Add both click and touch events
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick); // For desktops and general clicks
  cell.addEventListener('touchstart', handleCellTouch, { passive: true }); // For mobile
});

// Other functions remain unchanged
