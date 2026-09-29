const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { insertionSortList } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(listToArray(insertionSortList(buildList([4, 2, 1, 3]))), [1, 2, 3, 4]);
  assert.deepStrictEqual(listToArray(insertionSortList(buildList([-1, 5, 3, 4, 0]))), [-1, 0, 3, 4, 5]);
});

test('edge cases', () => {
  assert.strictEqual(insertionSortList(null), null);
  assert.deepStrictEqual(listToArray(insertionSortList(buildList([1]))), [1]);
  assert.deepStrictEqual(listToArray(insertionSortList(buildList([2, 2, 1, 1]))), [1, 1, 2, 2]);
});

test('matches numeric sort on random lists', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 11) - 5);
    assert.deepStrictEqual(listToArray(insertionSortList(buildList(a))), [...a].sort((x, y) => x - y));
  }
});

test('max size 5000 reversed runs fast', () => {
  const a = Array.from({ length: 5000 }, (_, i) => 5000 - i);
  const t0 = Date.now();
  assert.deepStrictEqual(listToArray(insertionSortList(buildList(a))), [...a].reverse());
  assert.ok(Date.now() - t0 < 1000);
});
