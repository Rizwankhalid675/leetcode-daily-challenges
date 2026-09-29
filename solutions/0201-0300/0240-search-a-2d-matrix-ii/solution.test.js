const test = require('node:test');
const assert = require('node:assert');
const { searchMatrix } = require('./solution');

function randMatrix(m, n) {
  const a = Array.from({ length: m }, () => new Array(n));
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      const base = Math.max(i ? a[i - 1][j] : -10, j ? a[i][j - 1] : -10);
      a[i][j] = base + Math.floor(Math.random() * 3);
    }
  return a;
}
const M = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]];

test('official examples', () => {
  assert.strictEqual(searchMatrix(M, 5), true);
  assert.strictEqual(searchMatrix(M, 20), false);
});

test('matches a full scan on random sorted matrices', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 6), n = 1 + Math.floor(Math.random() * 6);
    const a = randMatrix(m, n);
    const target = Math.floor(Math.random() * 40) - 12;
    assert.strictEqual(searchMatrix(a, target), a.flat().includes(target));
  }
});

test('extreme values and max size', () => {
  assert.strictEqual(searchMatrix([[-1e9, 1e9]], 1e9), true);
  const big = Array.from({ length: 300 }, (_, i) => Array.from({ length: 300 }, (_, j) => 2 * (i + j)));
  assert.strictEqual(searchMatrix(big, 599), false);
  assert.strictEqual(searchMatrix(big, 598), true);
});
