const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { swapPairs } = require('./solution');

function expected(arr) {
  const out = arr.slice();
  for (let i = 0; i + 1 < out.length; i += 2) [out[i], out[i + 1]] = [out[i + 1], out[i]];
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(listToArray(swapPairs(buildList([1, 2, 3, 4]))), [2, 1, 4, 3]);
  assert.deepStrictEqual(listToArray(swapPairs(buildList([]))), []);
  assert.deepStrictEqual(listToArray(swapPairs(buildList([1]))), [1]);
  assert.deepStrictEqual(listToArray(swapPairs(buildList([1, 2, 3]))), [2, 1, 3]);
});

test('swaps nodes, not just values', () => {
  const head = buildList([7, 7]);
  const second = head.next;
  const res = swapPairs(head);
  assert.strictEqual(res, second);
  assert.strictEqual(res.next, head);
  assert.strictEqual(head.next, null);
});

test('matches array pair-swap on random lists', () => {
  for (let t = 0; t < 300; t++) {
    const arr = Array.from({ length: Math.floor(Math.random() * 101) }, () => Math.floor(Math.random() * 101));
    assert.deepStrictEqual(listToArray(swapPairs(buildList(arr))), expected(arr));
  }
});
