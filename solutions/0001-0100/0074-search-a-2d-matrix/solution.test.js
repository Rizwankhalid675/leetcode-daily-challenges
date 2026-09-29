const test = require('node:test');
const assert = require('node:assert');
const { searchMatrix } = require('./solution');

test('official examples', () => {
  const m = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  assert.strictEqual(searchMatrix(m, 3), true);
  assert.strictEqual(searchMatrix(m, 13), false);
});

test('matches flat includes on random matrices', () => {
  for (let t = 0; t < 1000; t++) {
    const rows = 1 + Math.floor(Math.random() * 5), cols = 1 + Math.floor(Math.random() * 5);
    const vals = new Set();
    while (vals.size < rows * cols) vals.add(Math.floor(Math.random() * 100) - 50);
    const flat = [...vals].sort((a, b) => a - b);
    const mat = Array.from({ length: rows }, (_, r) => flat.slice(r * cols, r * cols + cols));
    const target = Math.floor(Math.random() * 110) - 55;
    assert.strictEqual(searchMatrix(mat, target), flat.includes(target));
  }
});
