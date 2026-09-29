const test = require('node:test');
const assert = require('node:assert');
const { tictactoe } = require('./solution');

const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
function oracle(moves) {
  const g = new Array(9).fill('');
  moves.forEach(([r, c], i) => (g[r * 3 + c] = i % 2 ? 'B' : 'A'));
  for (const p of ['A', 'B']) if (LINES.some((l) => l.every((k) => g[k] === p))) return p;
  return moves.length === 9 ? 'Draw' : 'Pending';
}
function randomGame() {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
  const len = 1 + Math.floor(Math.random() * 9);
  const moves = [];
  const g = new Array(9).fill('');
  for (let i = 0; i < len; i++) {
    const k = cells[i];
    g[k] = i % 2 ? 'B' : 'A';
    moves.push([Math.floor(k / 3), k % 3]);
    if (LINES.some((l) => l.every((x) => g[x] === g[k]))) break; // game stops at a win
  }
  return moves;
}

test('official examples', () => {
  assert.strictEqual(tictactoe([[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]]), 'A');
  assert.strictEqual(tictactoe([[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]]), 'B');
  assert.strictEqual(tictactoe([[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]]), 'Draw');
});

test('win on the 9th move is a win, not a draw', () => {
  assert.strictEqual(tictactoe([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 1], [2, 0], [2, 2]]), 'A');
  assert.strictEqual(tictactoe([[0, 0], [1, 1], [0, 1], [1, 0], [2, 2], [1, 2]]), 'B');
});

test('matches a grid-based checker on random legal games', () => {
  for (let t = 0; t < 3000; t++) {
    const moves = randomGame();
    assert.strictEqual(tictactoe(moves), oracle(moves));
  }
});
