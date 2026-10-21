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