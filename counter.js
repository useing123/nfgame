const gameBoard = document.getElementById('game-board');
const width = 10;
const tiles = [];
const playerStartPosition = 90;
let score = 0;
let playerPosition = playerStartPosition;
let health = 3;
let gameover = false;

// Generate game board tiles
for (let i = 0; i < width * width; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  if (i === playerStartPosition) {
    tile.classList.add('player');
  }
  gameBoard.appendChild(tile);
  tiles.push(tile);
}

// Handle player movement
document.addEventListener('keydown', (event) => {
  if (gameover) {
    return;
  }

  const key = event.key;
  let newPosition = playerPosition;

  switch (key) {
  case 'ArrowLeft':
  newPosition = playerPosition - 1;
  break;
  case 'ArrowRight':
  newPosition = playerPosition + 1;
  break;
  case 'ArrowUp':
  return;
  case 'ArrowDown':
  newPosition = playerPosition + width;
  break;
  case ' ':
  if (tiles[playerPosition].classList.contains('coin')) {
      tiles[playerPosition].classList.remove('coin');
      score++;
      document.getElementById('score').textContent = score;
  }
  return;
  default:
  return;
}


// Check if new position is valid
if (
newPosition < 0 ||
newPosition >= width * width ||
(playerPosition % width === 0 && newPosition === playerPosition - 1) ||
(playerPosition % width === width - 1 && newPosition === playerPosition + 1)
) {
return;
}

// Move player to new position
tiles[playerPosition].classList.remove('player');
tiles[newPosition].classList.add('player');
playerPosition = newPosition;

// Check if player has caught a coin
if (tiles[playerPosition].classList.contains('coin')) {
tiles[playerPosition].classList.remove('coin');
score++;
document.getElementById('score').textContent = score;
}
});

// Add initial score board
const scoreBoard = document.createElement('div');
scoreBoard.id = 'score-board';
scoreBoard.innerHTML = `Score: <span id="score">0</span>`;
document.body.appendChild(scoreBoard);
setInterval(() => {
moveCoins();
}, 1000);
function addCoin() {
const randomIndex = Math.floor(Math.random() * width);
const coinPosition = randomIndex;
const coinTile = tiles[coinPosition];
coinTile.classList.add('coin');
}
setInterval(() => {
if (!gameover) {
addCoin();
}
}, 3000);

function moveCoins() {
for (let i = width * width - 1; i >= 0; i--) {
const tile = tiles[i];
if (tile.classList.contains('coin')) {
const newCoinPosition = i + width;
if (newCoinPosition < width * width) {
  const newTile = tiles[newCoinPosition];
  if (!newTile.classList.contains('coin')) {
    newTile.classList.add('coin');
    tile.classList.remove('coin');
  }
} else {
  tile.classList.remove('coin');
  health--;
  document.getElementById('health').textContent = health;
  if (health === 0) {
  // Save the score to local storage
  localStorage.setItem('lastScore', score);
  // Show game over message with the score
  const message = `Game over! Your score is ${score}.`;
  alert(message);
    gameover = true;
  }
}
}
}
}

