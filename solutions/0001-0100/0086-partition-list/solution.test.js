const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { partition } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));

test('official examples', () => {
  assert.deepStrictEqual(listToArray(partition(buildList([1, 4, 3, 2, 5, 2]), 3)), [1, 2, 2, 4, 3, 5]);
  assert.deepStrictEqual(listToArray(partition(buildList([2, 1]), 2)), [1, 2]);
});

test('empty and one-sided', () => {
  assert.strictEqual(partition(null, 0), null);
  assert.deepStrictEqual(listToArray(partition(buildList([5, 6]), 0)), [5, 6]);
  assert.deepStrictEqual(listToArray(partition(buildList([5, 6]), 10)), [5, 6]);
});

test('matches stable filter', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(0, 15), -5, 5);
    const x = rint(-7, 7);
    const want = [...a.filter((v) => v < x), ...a.filter((v) => v >= x)];
    assert.deepStrictEqual(listToArray(partition(buildList(a), x)), want);
  }
});
