const test = require('node:test');
const assert = require('node:assert');
const { largestAltitude } = require('./solution');

test('official examples', () => {
  assert.strictEqual(largestAltitude([-5, 1, 5, 0, -7]), 1);
  assert.strictEqual(largestAltitude([-4, -3, -2, -1, 4, 3, 2]), 0); // start is highest
});

test('edge cases', () => {
  assert.strictEqual(largestAltitude([100]), 100);
  assert.strictEqual(largestAltitude([-100]), 0);
  assert.strictEqual(largestAltitude(Array(100).fill(100)), 10000);
});
