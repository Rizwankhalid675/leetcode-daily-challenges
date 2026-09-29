const test = require('node:test');
const assert = require('node:assert');
const { minPathSum } = require('./solution');

function brute(g) {
  const m = g.length, n = g[0].length;
  const go = (r, c) => {
    if (r === m - 1 && c === n - 1) return g[r][c];
    let best = Infinity;
    if (r + 1 < m) best = Math.min(best, go(r + 1, c));
    if (c + 1 < n) best = Math.min(best, go(r, c + 1));
    return g[r][c] + best;
  };
  return go(0, 0);
}

test('official examples', () => {
  assert.strictEqual(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]), 7);
  assert.strictEqual(minPathSum([[1, 2, 3], [4, 5, 6]]), 12);
});

test('single row / column / cell', () => {
  assert.strictEqual(minPathSum([[0]]), 0);
  assert.strictEqual(minPathSum([[1, 2, 3]]), 6);
  assert.strictEqual(minPathSum([[1], [2], [3]]), 6);
});

test('matches exhaustive path search', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 6), n = 1 + Math.floor(Math.random() * 6);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 10)));
    assert.strictEqual(minPathSum(g), brute(g));
  }
});
