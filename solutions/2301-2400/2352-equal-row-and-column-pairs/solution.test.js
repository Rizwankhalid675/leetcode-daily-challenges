const test = require('node:test');
const assert = require('node:assert');
const { equalPairs } = require('./solution');

function brute(g) {
  const n = g.length;
  let count = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (g[r].every((v, i) => v === g[i][c])) count++;
  return count;
}

test('official examples', () => {
  assert.strictEqual(equalPairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]), 1);
  assert.strictEqual(equalPairs([[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]]), 3);
});

test('edge cases', () => {
  assert.strictEqual(equalPairs([[1]]), 1);
  assert.strictEqual(equalPairs([[1, 1], [1, 1]]), 4); // every row matches every column
  // row 0 is [1,11] and column 1 is [11,1]; without a separator both would serialize to "111"
  assert.strictEqual(equalPairs([[1, 11], [5, 1]]), 0);
});

test('matches brute force', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 4);
    const g = Array.from({ length: n }, () => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 2)));
    assert.strictEqual(equalPairs(g), brute(g), JSON.stringify(g));
  }
});
