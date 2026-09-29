const test = require('node:test');
const assert = require('node:assert');
const { mergeTwoLists } = require('./solution');
const { buildList, listToArray } = require('../../../tests/helpers/list');

const run = (a, b) => listToArray(mergeTwoLists(buildList(a), buildList(b)));

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 4], [1, 3, 4]), [1, 1, 2, 3, 4, 4]);
  assert.deepStrictEqual(run([], []), []);
  assert.deepStrictEqual(run([], [0]), [0]);
});

test('matches concat + sort', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 10) - 5).sort((x, y) => x - y);
    const b = Array.from({ length: Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 10) - 5).sort((x, y) => x - y);
    assert.deepStrictEqual(run(a, b), [...a, ...b].sort((x, y) => x - y));
  }
});
