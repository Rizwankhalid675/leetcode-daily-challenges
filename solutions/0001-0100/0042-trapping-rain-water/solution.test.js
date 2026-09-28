const test = require('node:test');
const assert = require('node:assert');
const { trap } = require('./solution');

// Reference: direct formula with prefix/suffix maxima.
function reference(h) {
  const n = h.length;
  let water = 0;
  for (let i = 0; i < n; i++) water += Math.min(Math.max(...h.slice(0, i + 1)), Math.max(...h.slice(i))) - h[i];
  return water;
}

test('official examples', () => {
  assert.strictEqual(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assert.strictEqual(trap([4, 2, 0, 3, 2, 5]), 9);
});

test('edge cases and random', () => {
  assert.strictEqual(trap([5]), 0);
  assert.strictEqual(trap([1, 2, 3]), 0); // monotone: nothing trapped
  assert.strictEqual(trap([3, 0, 3]), 3);
  for (let t = 0; t < 1000; t++) {
    const h = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 6));
    assert.strictEqual(trap(h), reference(h), JSON.stringify(h));
  }
});
