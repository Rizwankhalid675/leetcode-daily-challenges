const test = require('node:test');
const assert = require('node:assert');
const { reverseList } = require('./solution');
const { buildList, listToArray } = require('../../../tests/helpers/list');

const run = (a) => listToArray(reverseList(buildList(a)));

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
  assert.deepStrictEqual(run([1, 2]), [2, 1]);
  assert.deepStrictEqual(run([]), []);
});

test('lengths 0..20 and the maximum size', () => {
  for (let n = 0; n <= 20; n++) {
    const a = Array.from({ length: n }, (_, i) => i - 10);
    assert.deepStrictEqual(run(a), [...a].reverse());
  }
  const big = Array.from({ length: 5000 }, (_, i) => i);
  assert.deepStrictEqual(run(big), [...big].reverse());
});
