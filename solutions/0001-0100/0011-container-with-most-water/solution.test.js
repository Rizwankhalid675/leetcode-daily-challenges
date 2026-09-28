const test = require('node:test');
const assert = require('node:assert');
const { maxArea } = require('./solution');

function brute(h) {
  let best = 0;
  for (let i = 0; i < h.length; i++) for (let j = i + 1; j < h.length; j++) best = Math.max(best, (j - i) * Math.min(h[i], h[j]));
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
  assert.strictEqual(maxArea([1, 1]), 1);
});

test('edge cases', () => {
  assert.strictEqual(maxArea([0, 0]), 0);
  assert.strictEqual(maxArea([5, 5, 5, 5]), 15);
  assert.strictEqual(maxArea([1, 2, 1]), 2);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const h = Array.from({ length: 2 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 10));
    assert.strictEqual(maxArea(h), brute(h), JSON.stringify(h));
  }
});
