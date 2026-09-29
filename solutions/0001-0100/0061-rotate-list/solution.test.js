const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { rotateRight } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));

test('official examples', () => {
  assert.deepStrictEqual(listToArray(rotateRight(buildList([1, 2, 3, 4, 5]), 2)), [4, 5, 1, 2, 3]);
  assert.deepStrictEqual(listToArray(rotateRight(buildList([0, 1, 2]), 4)), [2, 0, 1]);
});

test('empty, single, huge k', () => {
  assert.strictEqual(rotateRight(null, 5), null);
  assert.deepStrictEqual(listToArray(rotateRight(buildList([7]), 2e9)), [7]);
  assert.deepStrictEqual(listToArray(rotateRight(buildList([1, 2, 3]), 2e9)), [2, 3, 1]); // 2e9 % 3 = 2
  assert.deepStrictEqual(listToArray(rotateRight(buildList([1, 2, 3]), 0)), [1, 2, 3]);
});

test('matches repeated single-step rotation', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(0, 10), -100, 100);
    const k = rint(0, 25);
    const want = [...a];
    for (let i = 0; i < k && want.length; i++) want.unshift(want.pop());
    assert.deepStrictEqual(listToArray(rotateRight(buildList(a), k)), want);
  }
});
