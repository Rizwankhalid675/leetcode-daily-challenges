const test = require('node:test');
const assert = require('node:assert');
const { minimumTotal } = require('./solution');

function brute(tri) {
  const go = (r, c) => (r === tri.length ? 0 : tri[r][c] + Math.min(go(r + 1, c), go(r + 1, c + 1)));
  return go(0, 0);
}

test('official examples', () => {
  assert.strictEqual(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]), 11);
  assert.strictEqual(minimumTotal([[-10]]), -10);
});

test('matches exhaustive path search and leaves input unchanged', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const tri = Array.from({ length: n }, (_, r) => Array.from({ length: r + 1 }, () => Math.floor(Math.random() * 21) - 10));
    const copy = tri.map((row) => row.slice());
    assert.strictEqual(minimumTotal(tri), brute(copy));
    assert.deepStrictEqual(tri, copy);
  }
});
