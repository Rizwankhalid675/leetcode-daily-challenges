const test = require('node:test');
const assert = require('node:assert');
const { largestPerimeter } = require('./solution');

function brute(a) {
  let best = 0;
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      for (let k = j + 1; k < a.length; k++) {
        const [x, y, z] = [a[i], a[j], a[k]].sort((p, q) => p - q);
        if (x + y > z) best = Math.max(best, x + y + z);
      }
  return best;
}

test('official examples', () => {
  assert.strictEqual(largestPerimeter([2, 1, 2]), 5);
  assert.strictEqual(largestPerimeter([1, 2, 1, 10]), 0);
});

test('numeric sort, not string sort', () => {
  assert.strictEqual(largestPerimeter([9, 10, 100, 2]), 21);
});

test('matches O(n^3) brute force', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 3 + Math.floor(Math.random() * 8) }, () => 1 + Math.floor(Math.random() * 30));
    assert.strictEqual(largestPerimeter(a), brute(a));
  }
});

test('max size', () => {
  const a = Array.from({ length: 10000 }, () => 1 + Math.floor(Math.random() * 1e6));
  const t0 = Date.now();
  largestPerimeter(a);
  assert.ok(Date.now() - t0 < 1000);
});
