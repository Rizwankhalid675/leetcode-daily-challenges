const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { reverseKGroup } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));
function oracle(a, k) {
  const out = [];
  let i = 0;
  for (; i + k <= a.length; i += k) out.push(...a.slice(i, i + k).reverse());
  return out.concat(a.slice(i));
}

test('official examples', () => {
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList([1, 2, 3, 4, 5]), 2)), [2, 1, 4, 3, 5]);
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList([1, 2, 3, 4, 5]), 3)), [3, 2, 1, 4, 5]);
});

test('k = 1 and k = n', () => {
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList([1, 2, 3]), 1)), [1, 2, 3]);
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList([1, 2, 3]), 3)), [3, 2, 1]);
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList([1, 2, 3, 4]), 2)), [2, 1, 4, 3]);
});

test('matches chunked array reversal', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(1, 15), 0, 9);
    const k = rint(1, a.length);
    assert.deepStrictEqual(listToArray(reverseKGroup(buildList(a), k)), oracle(a, k));
  }
});

test('max size', () => {
  const a = Array.from({ length: 5000 }, (_, i) => i % 1001);
  assert.deepStrictEqual(listToArray(reverseKGroup(buildList(a), 7)), oracle(a, 7));
});
