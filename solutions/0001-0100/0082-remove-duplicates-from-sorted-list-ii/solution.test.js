const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { deleteDuplicates } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => rint(lo, hi));
function oracle(a) {
  const cnt = new Map();
  for (const v of a) cnt.set(v, (cnt.get(v) || 0) + 1);
  return a.filter((v) => cnt.get(v) === 1);
}

test('official examples', () => {
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 2, 3, 3, 4, 4, 5]))), [1, 2, 5]);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 1, 1, 2, 3]))), [2, 3]);
});

test('empty, all duplicates, trailing duplicates', () => {
  assert.strictEqual(deleteDuplicates(null), null);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 1]))), []);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 2, 2]))), [1]);
});

test('matches counting filter', () => {
  for (let t = 0; t < 1000; t++) {
    const a = rarr(rint(0, 20), -4, 4).sort((x, y) => x - y);
    assert.deepStrictEqual(listToArray(deleteDuplicates(buildList(a))), oracle(a));
  }
});
