const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { removeNthFromEnd } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));

test('official examples', () => {
  assert.deepStrictEqual(listToArray(removeNthFromEnd(buildList([1, 2, 3, 4, 5]), 2)), [1, 2, 3, 5]);
  assert.deepStrictEqual(listToArray(removeNthFromEnd(buildList([1]), 1)), []);
  assert.deepStrictEqual(listToArray(removeNthFromEnd(buildList([1, 2]), 1)), [1]);
});

test('removing the head', () => {
  assert.deepStrictEqual(listToArray(removeNthFromEnd(buildList([1, 2, 3]), 3)), [2, 3]);
});

test('matches array splice', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(1, 30), 0, 100);
    const n = rint(1, a.length);
    const want = [...a];
    want.splice(a.length - n, 1);
    assert.deepStrictEqual(listToArray(removeNthFromEnd(buildList(a), n)), want);
  }
});
