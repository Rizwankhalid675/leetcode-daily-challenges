const test = require('node:test');
const assert = require('node:assert');
const { exist } = require('./solution');

// Independent oracle: enumerate paths with a visited Set (no pruning, no in-place marking).
function oracle(board, word) {
  const m = board.length, n = board[0].length;
  const go = (r, c, i, seen) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return false;
    const k = r + ',' + c;
    if (seen.has(k) || board[r][c] !== word[i]) return false;
    if (i === word.length - 1) return true;
    const s2 = new Set(seen).add(k);
    return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dr, dc]) => go(r + dr, c + dc, i + 1, s2));
  };
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (go(r, c, 0, new Set())) return true;
  return false;
}

test('official examples', () => {
  const board = [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']];
  assert.strictEqual(exist(board, 'ABCCED'), true);
  assert.strictEqual(exist(board, 'SEE'), true);
  assert.strictEqual(exist(board, 'ABCB'), false);
});

test('random boards match oracle and board is restored', () => {
  for (let t = 0; t < 1000; t++) {
    const m = 1 + Math.floor(Math.random() * 4), n = 1 + Math.floor(Math.random() * 4);
    const board = Array.from({ length: m }, () => Array.from({ length: n }, () => 'aBc'[Math.floor(Math.random() * 3)]));
    const word = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 'aBc'[Math.floor(Math.random() * 3)]).join('');
    const copy = board.map((row) => row.slice());
    assert.strictEqual(exist(board, word), oracle(copy, word), JSON.stringify(copy) + ' ' + word);
    assert.deepStrictEqual(board, copy);
  }
});

test('adversarial 6x6 all-A board with an unreachable last letter is fast', () => {
  const board = Array.from({ length: 6 }, () => new Array(6).fill('A'));
  board[5][5] = 'B';
  const t0 = Date.now();
  assert.strictEqual(exist(board, 'AAAAAAAAAAAAAAB'), true);
  assert.strictEqual(exist(board, 'AAAAAAAAAAAAAAAB'.replace('B', 'C')), false);
  assert.strictEqual(exist(board, 'BAAAAAAAAAAAAAA'), true);
  assert.ok(Date.now() - t0 < 1000);
});
