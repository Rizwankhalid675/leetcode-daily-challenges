const test = require('node:test');
const assert = require('node:assert');
const { snakesAndLadders } = require('./solution');

// Independent oracle: label -> (row, col) by arithmetic, then Bellman-Ford style relaxation.
function oracle(board) {
  const n = board.length, N = n * n;
  const dest = (L) => {
    const q = Math.floor((L - 1) / n), off = (L - 1) % n;
    const col = q % 2 === 0 ? off : n - 1 - off;
    const v = board[n - 1 - q][col];
    return v === -1 ? L : v;
  };
  const dist = new Array(N + 1).fill(Infinity);
  dist[1] = 0;
  for (let changed = true; changed;) {
    changed = false;
    for (let s = 1; s <= N; s++) {
      if (dist[s] === Infinity) continue;
      for (let d = 1; d <= 6 && s + d <= N; d++) {
        const t = dest(s + d);
        if (dist[s] + 1 < dist[t]) { dist[t] = dist[s] + 1; changed = true; }
      }
    }
  }
  return dist[N] === Infinity ? -1 : dist[N];
}

test('official examples', () => {
  assert.strictEqual(snakesAndLadders([
    [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1],
    [-1, 35, -1, -1, 13, -1], [-1, -1, -1, -1, -1, -1], [-1, 15, -1, -1, -1, -1],
  ]), 4);
  assert.strictEqual(snakesAndLadders([[-1, -1], [-1, 3]]), 1);
});

test('only one jump per move (no chaining)', () => {
  // 5x5: square 2 has a ladder to 15, and square 15 has a ladder to 25.
  // Chaining would finish in 1 move; the rules stop at 15 after the first ladder.
  const board = Array.from({ length: 5 }, () => new Array(5).fill(-1));
  board[4][1] = 15; // square 2
  board[2][4] = 25; // square 15
  assert.strictEqual(snakesAndLadders(board), oracle(board));
  assert.ok(snakesAndLadders(board) > 1);
});

test('matches relaxation oracle on random boards', () => {
  for (let t = 0; t < 400; t++) {
    const n = 2 + Math.floor(Math.random() * 5), N = n * n;
    const board = Array.from({ length: n }, () => new Array(n).fill(-1));
    const cells = Math.floor(Math.random() * N);
    for (let k = 0; k < cells; k++) {
      const r = Math.floor(Math.random() * n), c = Math.floor(Math.random() * n);
      board[r][c] = 2 + Math.floor(Math.random() * (N - 1)); // 2..N
    }
    // squares 1 and N have no snake or ladder
    board[n - 1][0] = -1;
    board[0][(n - 1) % 2 === 0 ? n - 1 : 0] = -1;
    assert.strictEqual(snakesAndLadders(board), oracle(board));
  }
});
