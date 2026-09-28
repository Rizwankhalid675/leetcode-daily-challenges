const test = require('node:test');
const assert = require('node:assert');
const { hIndex } = require('./solution');

// Reference: the definition, checked for every h.
const brute = (c) => {
  let best = 0;
  for (let h = 0; h <= c.length; h++) if (c.filter((x) => x >= h).length >= h) best = h;
  return best;
};

test('official examples', () => {
  assert.strictEqual(hIndex([3, 0, 6, 1, 5]), 3);
  assert.strictEqual(hIndex([1, 3, 1]), 1);
});

test('edge cases and random', () => {
  assert.strictEqual(hIndex([0]), 0);
  assert.strictEqual(hIndex([1000]), 1);
  assert.strictEqual(hIndex([100, 100]), 2); // capped at n
  for (let t = 0; t < 1000; t++) {
    const c = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 12));
    assert.strictEqual(hIndex(c), brute(c), JSON.stringify(c));
  }
});
