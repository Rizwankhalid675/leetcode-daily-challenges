const test = require('node:test');
const assert = require('node:assert');
const { solve } = require('./solution');

// Independent oracle: find each 'O' component; flip it only if no cell touches the border.
function oracle(board) {
  const m = board.length, n = board[0].length;
  const out = board.map((row) => row.slice());
  const seen = board.map((row) => row.map(() => false));
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    if (board[r][c] !== 'O' || seen[r][c]) continue;
    const comp = [[r, c]];
    seen[r][c] = true;
    let border = false;
    for (let i = 0; i < comp.length; i++) {
      const [x, y] = comp[i];
      if (x === 0 || y === 0 || x === m - 1 || y === n - 1) border = true;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const a = x + dx, b = y + dy;
        if (a >= 0 && a < m && b >= 0 && b < n && board[a][b] === 'O' && !seen[a][b]) { seen[a][b] = true; comp.push([a, b]); }
      }
    }
    if (!border) for (const [x, y] of comp) out[x][y] = 'X';
  }
  return out;
}

test('official examples', () => {
  const b1 = [['X', 'X', 'X', 'X'], ['X', 'O', 'O', 'X'], ['X', 'X', 'O', 'X'], ['X', 'O', 'X', 'X']];
  solve(b1);
  assert.deepStrictEqual(b1, [['X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X'], ['X', 'O', 'X', 'X']]);
  const b2 = [['X']];
  solve(b2);
  assert.deepStrictEqual(b2, [['X']]);
});

test('matches component-based oracle on random boards', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 7), n = 1 + Math.floor(Math.random() * 7);
    const board = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.55 ? 'O' : 'X')));
    const want = oracle(board);
    solve(board);
    assert.deepStrictEqual(board, want);
  }
});

test('200x200 all-O board (no recursion, fast)', () => {
  const board = Array.from({ length: 200 }, () => new Array(200).fill('O'));
  const t0 = Date.now();
  solve(board);
  assert.ok(Date.now() - t0 < 1000);
  assert.ok(board.every((row) => row.every((ch) => ch === 'O')));
});
