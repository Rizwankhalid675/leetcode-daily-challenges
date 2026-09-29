const test = require('node:test');
const assert = require('node:assert');
const { ListNode, buildList, listToArray } = require('../../../tests/helpers/list');
global.ListNode = ListNode; // LeetCode provides ListNode globally
const { isPalindrome } = require('./solution');

test('official examples', () => {
  assert.strictEqual(isPalindrome(buildList([1, 2, 2, 1])), true);
  assert.strictEqual(isPalindrome(buildList([1, 2])), false);
});

test('small cases', () => {
  assert.strictEqual(isPalindrome(buildList([7])), true);
  assert.strictEqual(isPalindrome(buildList([1, 1])), true);
  assert.strictEqual(isPalindrome(buildList([1, 2, 1])), true);
  assert.strictEqual(isPalindrome(buildList([1, 2, 3])), false);
});

test('matches array check and leaves the list intact', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    let arr = Array.from({ length: n }, () => Math.floor(Math.random() * 3));
    if (Math.random() < 0.5) arr = arr.concat(arr.slice(0, n - (Math.random() < 0.5 ? 1 : 0)).reverse());
    const head = buildList(arr);
    assert.strictEqual(isPalindrome(head), arr.join() === [...arr].reverse().join());
    assert.deepStrictEqual(listToArray(head), arr);
  }
});

test('10^5 nodes, no recursion', () => {
  const half = Array.from({ length: 50000 }, () => Math.floor(Math.random() * 10));
  const t0 = Date.now();
  assert.strictEqual(isPalindrome(buildList(half.concat([...half].reverse()))), true);
  const bad = half.concat([...half].reverse());
  bad[70000] = (bad[70000] + 1) % 10;
  assert.strictEqual(isPalindrome(buildList(bad)), false);
  assert.ok(Date.now() - t0 < 1000);
});
