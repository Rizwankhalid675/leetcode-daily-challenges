const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { mergeKLists } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(listToArray(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]].map(buildList))), [1, 1, 2, 3, 4, 4, 5, 6]);
  assert.strictEqual(mergeKLists([]), null);
  assert.strictEqual(mergeKLists([buildList([])]), null);
});

test('matches flatten + sort on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const arrs = Array.from({ length: Math.floor(Math.random() * 7) }, () =>
      Array.from({ length: Math.floor(Math.random() * 5) }, () => Math.floor(Math.random() * 21) - 10).sort((x, y) => x - y));
    const expected = arrs.flat().sort((x, y) => x - y);
    const got = mergeKLists(arrs.map(buildList));
    assert.deepStrictEqual(got === null ? [] : listToArray(got), expected);
  }
});

test('10^4 single-node lists run fast', () => {
  const arrs = Array.from({ length: 1e4 }, () => [Math.floor(Math.random() * 2e4) - 1e4]);
  const t0 = Date.now();
  assert.deepStrictEqual(listToArray(mergeKLists(arrs.map(buildList))), arrs.flat().sort((x, y) => x - y));
  assert.ok(Date.now() - t0 < 1000);
});
