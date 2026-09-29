const test = require('node:test');
const assert = require('node:assert');
const { getSum } = require('./solution');

test('official examples', () => {
  assert.strictEqual(getSum(1, 2), 3);
  assert.strictEqual(getSum(2, 3), 5);
});

test('exhaustive over the whole input range', () => {
  for (let a = -1000; a <= 1000; a++) {
    for (let b = -1000; b <= 1000; b += 1) assert.strictEqual(getSum(a, b), a + b);
  }
});
