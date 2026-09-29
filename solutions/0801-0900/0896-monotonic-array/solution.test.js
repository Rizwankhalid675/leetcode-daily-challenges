const test = require('node:test');
const assert = require('node:assert');
const { isMonotonic } = require('./solution');

function oracle(a) {
  const inc = a.every((x, i) => i === 0 || a[i - 1] <= x);
  const dec = a.every((x, i) => i === 0 || a[i - 1] >= x);
  return inc || dec;
}

test('official examples', () => {
  assert.strictEqual(isMonotonic([1, 2, 2, 3]), true);
  assert.strictEqual(isMonotonic([6, 5, 4, 4]), true);
  assert.strictEqual(isMonotonic([1, 3, 2]), false);
});

test('matches two-direction check on random arrays', () => {
  for (let t = 0; t < 2000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => Math.floor(Math.random() * 3));
    assert.strictEqual(isMonotonic(a), oracle(a));
  }
});
