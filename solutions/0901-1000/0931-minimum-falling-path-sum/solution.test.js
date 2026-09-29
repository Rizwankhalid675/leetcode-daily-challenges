const test = require('node:test');
const assert = require('node:assert');
const { minFallingPathSum } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(mat) {
  const n = mat.length;
  let best = Infinity;
  const dfs = (i, j, s) => {
    s += mat[i][j];
    if (i === n - 1) { best = Math.min(best, s); return; }
    for (const d of [-1, 0, 1]) if (j + d >= 0 && j + d < n) dfs(i + 1, j + d, s);
  };
  for (let j = 0; j < n; j++) dfs(0, j, 0);
  return best;
}

test('official examples', () => {
  assert.strictEqual(minFallingPathSum([[2, 1, 3], [6, 5, 4], [7, 8, 9]]), 13);
  assert.strictEqual(minFallingPathSum([[-19, 57], [-40, -5]]), -59);
});

test('single cell', () => {
  assert.strictEqual(minFallingPathSum([[-7]]), -7);
});

test('matches exhaustive path search', () => {
  for (let t = 0; t < 300; t++) {
    const n = ri(1, 5);
    const m = Array.from({ length: n }, () => rarr(n, -100, 100));
    assert.strictEqual(minFallingPathSum(m), brute(m));
  }
});
