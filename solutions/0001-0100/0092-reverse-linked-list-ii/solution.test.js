const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { reverseBetween } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));

test('official examples', () => {
  assert.deepStrictEqual(listToArray(reverseBetween(buildList([1, 2, 3, 4, 5]), 2, 4)), [1, 4, 3, 2, 5]);
  assert.deepStrictEqual(listToArray(reverseBetween(buildList([5]), 1, 1)), [5]);
});

test('whole list and edges', () => {
  assert.deepStrictEqual(listToArray(reverseBetween(buildList([1, 2, 3]), 1, 3)), [3, 2, 1]);
  assert.deepStrictEqual(listToArray(reverseBetween(buildList([1, 2, 3]), 1, 2)), [2, 1, 3]);
  assert.deepStrictEqual(listToArray(reverseBetween(buildList([1, 2, 3]), 3, 3)), [1, 2, 3]);
});

test('matches array slice reversal', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(1, 12), -5, 5);
    const l = rint(1, a.length), r = rint(l, a.length);
    const want = [...a.slice(0, l - 1), ...a.slice(l - 1, r).reverse(), ...a.slice(r)];
    assert.deepStrictEqual(listToArray(reverseBetween(buildList(a), l, r)), want);
  }
});
