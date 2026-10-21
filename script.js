let moves = 0, time = 0, timer = null, gameOver = false;
const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

function cell(r, c) { return document.getElementById("cell" + r + c); }
function inBounds(r, c) { return r >= 1 && r <= 4 && c >= 1 && c <= 4; }

function swapTiles(a, b) {
  const temp = a.className;
  a.className = b.className;
  b.className = temp;
}

function updateStats() {
  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = time;
}

function clickTile(r, c) {
    if (gameOver || cell(r, c).className === "tile16") return;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (inBounds(nr, nc) && cell(nr, nc).className === "tile16") {
        swapTiles(cell(r, c), cell(nr, nc));
        moves++;
        updateStats();
        if (isSolved()) {
          gameOver = true;
          clearInterval(timer);
          setTimeout(win, 500); // delay so the last tile shows before the popup
        }
        return;
      }
    }
  }

  function isSolved() {
    let n = 1;
    for (let r = 1; r <= 4; r++)
      for (let c = 1; c <= 4; c++)
        if (cell(r, c).className !== "tile" + n++) return false;
    return true;
  }
  
  function win() {
    if (confirm("Congratulations! You solved it!\nTime: " + time +
                " seconds\nMoves: " + moves + "\n\nWould you like to play again?")) {
      newGame();
    }
  }

  function resetBoard() {
    let n = 1;
    for (let r = 1; r <= 4; r++)
      for (let c = 1; c <= 4; c++)
        cell(r, c).className = "tile" + n++;
  }
  
  function startGame() {
    moves = 0; time = 0; gameOver = false;
    updateStats();
    clearInterval(timer);
    timer = setInterval(() => { time++; updateStats(); }, 1000);
  }

  function newGame() {
    resetBoard();
    let er = 4, ec = 4; // where the empty slot is
    for (let i = 0; i < 500; i++) {
      const options = DIRS.filter(([dr, dc]) => inBounds(er + dr, ec + dc));
      const [dr, dc] = options[Math.floor(Math.random() * options.length)];
      swapTiles(cell(er, ec), cell(er + dr, ec + dc));
      er += dr; ec += dc;
    }
    if (isSolved()) return newGame(); // very unlikely, but just in case
    startGame();
  }

  function simpleGame() {
    resetBoard();
    swapTiles(cell(4, 3), cell(4, 4));
    startGame();
  }
  
  window.onload = newGame; // board starts scrambled (requirement 1)