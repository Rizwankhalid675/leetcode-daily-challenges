const test = require('node:test');
const assert = require('node:assert');
const { shuffle } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(shuffle([2, 5, 1, 3, 4, 7], 3), [2, 3, 5, 4, 1, 7]);
  assert.deepStrictEqual(shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4), [1, 4, 2, 3, 3, 2, 4, 1]);
  assert.deepStrictEqual(shuffle([1, 1, 2, 2], 2), [1, 2, 1, 2]);
});
