const test = require('node:test');
const assert = require('node:assert');
const { rotate } = require('./solution');

const run = (m) => {
  const copy = m.map((r) => [...r]);
  rotate(copy);
  return copy;
};
// Reference: new[j][n-1-i] = old[i][j]
const reference = (m) => {
  const n = m.length;
  const out = m.map((r) => [...r]);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) out[j][n - 1 - i] = m[i][j];
  return out;
};

test('official examples', () => {
  assert.deepStrictEqual(run([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
  assert.deepStrictEqual(run([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]), [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]);
});

test('every size 1..20 matches the index formula; four rotations restore the matrix', () => {
  for (let n = 1; n <= 20; n++) {
    const m = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i * n + j));
    assert.deepStrictEqual(run(m), reference(m));
    assert.deepStrictEqual(run(run(run(run(m)))), m);
  }
});
