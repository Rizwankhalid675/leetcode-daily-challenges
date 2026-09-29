const test = require('node:test');
const assert = require('node:assert');
const { largestRectangleArea } = require('./solution');

function brute(h) {
  let best = 0;
  for (let i = 0; i < h.length; i++) { let m = Infinity; for (let j = i; j < h.length; j++) { m = Math.min(m, h[j]); best = Math.max(best, m * (j - i + 1)); } }
  return best;
}

test('official examples', () => {
  assert.strictEqual(largestRectangleArea([2, 1, 5, 6, 2, 3]), 10);
  assert.strictEqual(largestRectangleArea([2, 4]), 4);
});

test('edge cases and random', () => {
  assert.strictEqual(largestRectangleArea([0]), 0);
  assert.strictEqual(largestRectangleArea([3, 3, 3]), 9);
  for (let t = 0; t < 1000; t++) {
    const h = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 6));
    assert.strictEqual(largestRectangleArea(h), brute(h), JSON.stringify(h));
  }
});
