const test = require('node:test');
const assert = require('node:assert');
const { diagonalSum } = require('./solution');

function oracle(mat) {
  const n = mat.length;
  let s = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i === j || i + j === n - 1) s += mat[i][j];
  return s;
}

test('official examples', () => {
  assert.strictEqual(diagonalSum([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 25);
  assert.strictEqual(diagonalSum([[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]), 8);
  assert.strictEqual(diagonalSum([[5]]), 5);
});

test('matches cell-by-cell check', () => {
  for (let n = 1; n <= 30; n++) {
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 100)));
    assert.strictEqual(diagonalSum(mat), oracle(mat));
  }
});
