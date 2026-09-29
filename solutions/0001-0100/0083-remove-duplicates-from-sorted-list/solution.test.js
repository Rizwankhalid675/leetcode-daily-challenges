const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { deleteDuplicates } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 1, 2]))), [1, 2]);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([1, 1, 2, 3, 3]))), [1, 2, 3]);
});

test('edge cases', () => {
  assert.strictEqual(deleteDuplicates(null), null);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([5, 5, 5, 5]))), [5]);
  assert.deepStrictEqual(listToArray(deleteDuplicates(buildList([-100, 0, 100]))), [-100, 0, 100]);
});

test('matches Set-based dedupe on random sorted lists', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 7) - 3).sort((x, y) => x - y);
    assert.deepStrictEqual(listToArray(deleteDuplicates(buildList(a))), [...new Set(a)]);
  }
});
