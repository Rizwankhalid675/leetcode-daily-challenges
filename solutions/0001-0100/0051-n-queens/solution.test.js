const test = require('node:test');
const assert = require('node:assert');
const { solveNQueens } = require('./solution');

function valid(board, n) {
  if (board.length !== n) return false;
  const q = [];
  for (let r = 0; r < n; r++) {
    if (board[r].length !== n) return false;
    const cs = [...board[r]].map((ch, c) => (ch === 'Q' ? c : -1)).filter((c) => c >= 0);
    if (cs.length !== 1 || /[^.Q]/.test(board[r])) return false;
    q.push(cs[0]);
  }
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) if (q[i] === q[j] || Math.abs(q[i] - q[j]) === j - i) return false;
  return true;
}
const norm = (bs) => bs.map((b) => b.join('|')).sort();

test('official examples', () => {
  assert.deepStrictEqual(norm(solveNQueens(4)), norm([['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']]));
  assert.deepStrictEqual(solveNQueens(1), [['Q']]);
});

test('known solution counts, every board valid and distinct for n = 1..9', () => {
  const counts = [1, 0, 0, 2, 10, 4, 40, 92, 352];
  for (let n = 1; n <= 9; n++) {
    const res = solveNQueens(n);
    assert.strictEqual(res.length, counts[n - 1]);
    assert.strictEqual(new Set(norm(res)).size, res.length);
    for (const b of res) assert.ok(valid(b, n));
  }
});
