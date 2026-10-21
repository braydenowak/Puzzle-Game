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