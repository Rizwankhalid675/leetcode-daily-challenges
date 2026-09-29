const test = require('node:test');
const assert = require('node:assert');
const { totalNQueens } = require('./solution');

// Independent oracle: straightforward placement with explicit attack checks.
function naive(n) {
  const q = [];
  const ok = (r, c) => q.every((qc, qr) => qc !== c && Math.abs(qc - c) !== r - qr);
  const go = (r) => {
    if (r === n) return 1;
    let s = 0;
    for (let c = 0; c < n; c++) if (ok(r, c)) { q.push(c); s += go(r + 1); q.pop(); }
    return s;
  };
  return go(0);
}

test('official examples', () => {
  assert.strictEqual(totalNQueens(4), 2);
  assert.strictEqual(totalNQueens(1), 1);
});

test('known counts for n = 1..9 and naive oracle', () => {
  const known = [1, 0, 0, 2, 10, 4, 40, 92, 352];
  for (let n = 1; n <= 9; n++) {
    assert.strictEqual(totalNQueens(n), known[n - 1]);
    assert.strictEqual(totalNQueens(n), naive(n));
  }
});
