const test = require('node:test');
const assert = require('node:assert');
const { uniqueOccurrences } = require('./solution');

test('official examples', () => {
  assert.strictEqual(uniqueOccurrences([1, 2, 2, 1, 1, 3]), true);
  assert.strictEqual(uniqueOccurrences([1, 2]), false);
  assert.strictEqual(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]), true);
});

test('edge cases', () => {
  assert.strictEqual(uniqueOccurrences([7]), true);
  assert.strictEqual(uniqueOccurrences([1, 1, 2, 2]), false);
  assert.strictEqual(uniqueOccurrences([-1000, 1000, 1000]), true);
});
