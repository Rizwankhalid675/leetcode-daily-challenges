const test = require('node:test');
const assert = require('node:assert');
const { smallestIndex } = require('./solution');

test('official examples', () => {
  assert.strictEqual(smallestIndex([1, 3, 2]), 2);
  assert.strictEqual(smallestIndex([1, 10, 11]), 1);
  assert.strictEqual(smallestIndex([1, 2, 3]), -1);
});

test('edge cases', () => {
  assert.strictEqual(smallestIndex([0]), 0); // digit sum of 0 is 0
  assert.strictEqual(smallestIndex([5, 0, 1000]), -1); // digit sums 5, 0, 1 never match 0, 1, 2
  assert.strictEqual(smallestIndex([9, 1, 999]), 1);
  assert.strictEqual(smallestIndex([...Array(27).fill(0), 999]), 0);
  assert.strictEqual(smallestIndex([...Array(27).fill(1), 999]), 1);
});
