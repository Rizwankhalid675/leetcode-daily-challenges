const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { reorderList } = require('./solution');

function expected(arr) {
  const out = [];
  let i = 0, j = arr.length - 1;
  while (i <= j) {
    out.push(arr[i++]);
    if (i <= j) out.push(arr[j--]);
  }
  return out;
}

function run(arr) {
  const head = buildList(arr);
  const ret = reorderList(head);
  assert.strictEqual(ret, undefined);
  return listToArray(head);
}

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 3, 4]), [1, 4, 2, 3]);
  assert.deepStrictEqual(run([1, 2, 3, 4, 5]), [1, 5, 2, 4, 3]);
});

test('lengths 1..40 match index-based expectation', () => {
  for (let n = 1; n <= 40; n++) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    assert.deepStrictEqual(run(arr), expected(arr));
  }
});

test('max length 5 * 10^4 (no recursion)', () => {
  const arr = Array.from({ length: 50000 }, (_, i) => i % 1000 + 1);
  assert.deepStrictEqual(run(arr), expected(arr));
});
