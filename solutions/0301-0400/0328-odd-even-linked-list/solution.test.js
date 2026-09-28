const test = require('node:test');
const assert = require('node:assert');
const { oddEvenList } = require('./solution');
const { buildList, listToArray } = require('../../../tests/helpers/list');

const run = (a) => listToArray(oddEvenList(buildList(a)));
const expected = (a) => [...a.filter((_, i) => i % 2 === 0), ...a.filter((_, i) => i % 2 === 1)];

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 3, 4, 5]), [1, 3, 5, 2, 4]);
  assert.deepStrictEqual(run([2, 1, 3, 5, 6, 4, 7]), [2, 3, 6, 7, 1, 5, 4]);
});

test('every length 0..20', () => {
  for (let n = 0; n <= 20; n++) {
    const a = Array.from({ length: n }, (_, i) => i * 10);
    assert.deepStrictEqual(run(a), expected(a), `n=${n}`);
  }
});
