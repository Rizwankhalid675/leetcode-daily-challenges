const test = require('node:test');
const assert = require('node:assert');
const { deleteMiddle } = require('./solution');
const { buildList, listToArray } = require('../../../tests/helpers/list');

const run = (a) => listToArray(deleteMiddle(buildList(a)));

test('official examples', () => {
  assert.deepStrictEqual(run([1, 3, 4, 7, 1, 2, 6]), [1, 3, 4, 1, 2, 6]);
  assert.deepStrictEqual(run([1, 2, 3, 4]), [1, 2, 4]);
  assert.deepStrictEqual(run([2, 1]), [2]);
});

test('every length 1..20 removes index floor(n/2)', () => {
  for (let n = 1; n <= 20; n++) {
    const a = Array.from({ length: n }, (_, i) => i + 1);
    const expected = a.filter((_, i) => i !== Math.floor(n / 2));
    assert.deepStrictEqual(run(a), expected, `n=${n}`);
  }
});
